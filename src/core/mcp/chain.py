"""
Chain Implementation for MCP

This module defines the Chain class for the Multi-Chain Protocol, which 
represents a sequence of messages that form a conversation or transaction.
"""

import uuid
import time
import logging
from typing import Dict, Any, List, Optional

logger = logging.getLogger(__name__)

class Chain:
    """
    Represents a chain of messages in the Multi-Chain Protocol.
    
    A chain is a sequence of messages that are logically connected, forming
    a conversation, transaction, or other type of interaction between agents.
    """
    
    def __init__(self, chain_id: Optional[str] = None, max_depth: int = 5):
        """
        Initialize a new chain.
        
        Args:
            chain_id: Optional ID for the chain. If not provided, a UUID will be generated.
            max_depth: Maximum depth of the chain before it needs to be terminated.
        """
        self.chain_id = chain_id or str(uuid.uuid4())
        self.messages: List[Dict[str, Any]] = []
        self.created_at = time.time()
        self.updated_at = self.created_at
        self.max_depth = max_depth
        self.state = "active"  # active, terminated, or failed
        
        logger.info(f"Created new chain: {self.chain_id}")
    
    def add_message(self, message: Dict[str, Any]) -> bool:
        """
        Add a message to the chain.
        
        Args:
            message: The message to add to the chain
            
        Returns:
            True if the message was added successfully, False otherwise
        """
        # Validate that this message belongs to this chain
        if message.get("chain_id") != self.chain_id:
            logger.error(f"Message chain ID mismatch: {message.get('chain_id')} != {self.chain_id}")
            return False
        
        # Check if the chain has reached its maximum depth
        if len(self.messages) >= self.max_depth:
            logger.warning(f"Chain {self.chain_id} has reached maximum depth {self.max_depth}")
            self.state = "terminated"
            return False
        
        # Add the message to the chain
        self.messages.append(message)
        self.updated_at = time.time()
        
        logger.debug(f"Added message {message.get('message_id')} to chain {self.chain_id}")
        return True
    
    def get_message(self, message_id: str) -> Optional[Dict[str, Any]]:
        """
        Get a message from the chain by its ID.
        
        Args:
            message_id: The ID of the message to retrieve
            
        Returns:
            The message if found, None otherwise
        """
        for message in self.messages:
            if message.get("message_id") == message_id:
                return message
        return None
    
    def get_last_message(self) -> Optional[Dict[str, Any]]:
        """
        Get the last message in the chain.
        
        Returns:
            The last message if the chain has messages, None otherwise
        """
        if not self.messages:
            return None
        return self.messages[-1]
    
    def terminate(self, reason: str = "completed") -> None:
        """
        Terminate the chain.
        
        Args:
            reason: The reason for terminating the chain
        """
        self.state = "terminated"
        logger.info(f"Chain {self.chain_id} terminated: {reason}")
    
    def fail(self, reason: str) -> None:
        """
        Mark the chain as failed.
        
        Args:
            reason: The reason for the failure
        """
        self.state = "failed"
        logger.error(f"Chain {self.chain_id} failed: {reason}")
    
    def to_dict(self) -> Dict[str, Any]:
        """
        Convert the chain to a dictionary.
        
        Returns:
            A dictionary representation of the chain
        """
        return {
            "chain_id": self.chain_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "state": self.state,
            "message_count": len(self.messages),
            "max_depth": self.max_depth
        } 