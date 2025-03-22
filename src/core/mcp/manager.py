"""
Chain Manager for MCP

This module provides the ChainManager class which manages multiple chains
and provides functionality for creating, retrieving, and managing chains.
"""

import time
import logging
import yaml
import os
from typing import Dict, Any, List, Optional, Set

from src.core.mcp.chain import Chain
from src.core.mcp.protocol import MCPProtocol

logger = logging.getLogger(__name__)

class ChainManager:
    """
    Manages multiple chains in the Multi-Chain Protocol system.
    
    The ChainManager is responsible for creating, retrieving, and managing
    chains, as well as enforcing limits on the number of active chains.
    """
    
    def __init__(self, config_path: str = "config/mcp_config.yaml"):
        """
        Initialize the ChainManager.
        
        Args:
            config_path: Path to the MCP configuration file
        """
        self.chains: Dict[str, Chain] = {}
        self.active_chains: Set[str] = set()
        self.protocol = MCPProtocol()
        self.config = self._load_config(config_path)
        
        # Set default values if config is not loaded
        self.max_concurrent_chains = self.config.get("mcp", {}).get(
            "performance", {}).get("max_concurrent_chains", 10)
        
        self.chain_timeout_seconds = self.config.get("mcp", {}).get(
            "chain", {}).get("timeout_seconds", 30)
        
        self.chain_max_depth = self.config.get("mcp", {}).get(
            "chain", {}).get("max_depth", 5)
        
        logger.info(f"Initialized ChainManager with max {self.max_concurrent_chains} concurrent chains")
    
    def _load_config(self, config_path: str) -> Dict[str, Any]:
        """
        Load configuration from a YAML file.
        
        Args:
            config_path: Path to the configuration file
            
        Returns:
            Configuration dictionary
        """
        try:
            if os.path.exists(config_path):
                with open(config_path, 'r') as file:
                    config = yaml.safe_load(file)
                logger.info(f"Loaded configuration from {config_path}")
                return config
            else:
                logger.warning(f"Configuration file {config_path} not found. Using defaults.")
                return {}
        except Exception as e:
            logger.error(f"Error loading configuration: {e}")
            return {}
    
    def create_chain(self) -> Chain:
        """
        Create a new chain.
        
        Returns:
            A new Chain instance
        
        Raises:
            RuntimeError: If the maximum number of concurrent chains is reached
        """
        # Check if we've reached the maximum number of concurrent chains
        if len(self.active_chains) >= self.max_concurrent_chains:
            # Clean up expired chains first
            self._cleanup_expired_chains()
            
            # Check again after cleanup
            if len(self.active_chains) >= self.max_concurrent_chains:
                logger.error(f"Maximum number of concurrent chains reached: {self.max_concurrent_chains}")
                raise RuntimeError(f"Maximum number of concurrent chains reached: {self.max_concurrent_chains}")
        
        # Create a new chain
        chain = Chain(max_depth=self.chain_max_depth)
        self.chains[chain.chain_id] = chain
        self.active_chains.add(chain.chain_id)
        
        logger.info(f"Created new chain: {chain.chain_id}. Active chains: {len(self.active_chains)}")
        return chain
    
    def get_chain(self, chain_id: str) -> Optional[Chain]:
        """
        Get a chain by its ID.
        
        Args:
            chain_id: The ID of the chain to retrieve
            
        Returns:
            The Chain if found, None otherwise
        """
        return self.chains.get(chain_id)
    
    def terminate_chain(self, chain_id: str, reason: str = "completed") -> bool:
        """
        Terminate a chain.
        
        Args:
            chain_id: The ID of the chain to terminate
            reason: The reason for terminating the chain
            
        Returns:
            True if the chain was terminated, False if the chain was not found
        """
        chain = self.get_chain(chain_id)
        if chain is None:
            logger.warning(f"Cannot terminate chain {chain_id}: Chain not found")
            return False
        
        chain.terminate(reason)
        if chain_id in self.active_chains:
            self.active_chains.remove(chain_id)
        
        logger.info(f"Terminated chain: {chain_id}. Reason: {reason}")
        return True
    
    def _cleanup_expired_chains(self) -> int:
        """
        Clean up expired chains.
        
        Returns:
            Number of chains that were cleaned up
        """
        now = time.time()
        expired_chains = []
        
        for chain_id in list(self.active_chains):
            chain = self.chains.get(chain_id)
            if chain is None:
                self.active_chains.remove(chain_id)
                continue
                
            # Check if the chain has expired
            if now - chain.updated_at > self.chain_timeout_seconds:
                expired_chains.append(chain_id)
                
        # Terminate all expired chains
        for chain_id in expired_chains:
            self.terminate_chain(chain_id, reason="timeout")
            
        logger.info(f"Cleaned up {len(expired_chains)} expired chains")
        return len(expired_chains)
    
    def get_active_chains(self) -> List[Chain]:
        """
        Get all active chains.
        
        Returns:
            List of active Chain instances
        """
        return [self.chains[chain_id] for chain_id in self.active_chains 
                if chain_id in self.chains]
    
    def get_stats(self) -> Dict[str, Any]:
        """
        Get statistics about the ChainManager.
        
        Returns:
            Dictionary with statistics
        """
        return {
            "active_chains": len(self.active_chains),
            "total_chains": len(self.chains),
            "max_concurrent_chains": self.max_concurrent_chains,
            "chain_timeout_seconds": self.chain_timeout_seconds
        } 