"""
MCP Agent Implementation

This module defines an agent that can participate in Multi-Chain Protocol communication.
"""

import logging
import time
import uuid
from typing import Dict, Any, List, Optional, Callable

from src.core.mcp.protocol import MCPProtocol
from src.core.mcp.chain import Chain

logger = logging.getLogger(__name__)

class MCPAgent:
    """
    An agent that can participate in Multi-Chain Protocol communication.
    
    This agent can send and receive messages using the MCP protocol,
    and can participate in multiple chains simultaneously.
    """
    
    def __init__(self, agent_id: Optional[str] = None, agent_type: str = "generic"):
        """
        Initialize the MCP Agent.
        
        Args:
            agent_id: Optional ID for the agent. If not provided, a UUID will be generated.
            agent_type: The type of agent (e.g., "security", "resource", "generic")
        """
        self.agent_id = agent_id or f"{agent_type}-{str(uuid.uuid4())[:8]}"
        self.agent_type = agent_type
        self.protocol = MCPProtocol()
        self.active_chains: Dict[str, Chain] = {}
        self.message_handlers: Dict[str, List[Callable]] = {}
        self.created_at = time.time()
        
        logger.info(f"Initialized MCP Agent: {self.agent_id} (Type: {self.agent_type})")
    
    def register_message_handler(self, message_type: str, handler: Callable) -> None:
        """
        Register a handler for a specific message type.
        
        Args:
            message_type: The type of message to handle
            handler: The handler function to call when a message of this type is received
        """
        if message_type not in self.message_handlers:
            self.message_handlers[message_type] = []
        
        self.message_handlers[message_type].append(handler)
        logger.debug(f"Registered handler for message type: {message_type}")
    
    def send_message(self, 
                    receiver_id: str, 
                    content: Dict[str, Any],
                    chain_id: Optional[str] = None) -> Dict[str, Any]:
        """
        Send a message to another agent.
        
        Args:
            receiver_id: ID of the receiving agent
            content: Message payload
            chain_id: Optional chain ID for existing chains
            
        Returns:
            The sent message
        """
        # If a chain ID is provided, make sure we're tracking it
        if chain_id and chain_id not in self.active_chains:
            chain = Chain(chain_id=chain_id)
            self.active_chains[chain_id] = chain
        
        # Create a new chain if needed
        if chain_id is None:
            chain = Chain()
            chain_id = chain.chain_id
            self.active_chains[chain_id] = chain
        
        # Create and add the message to the chain
        message = self.protocol.create_message(
            sender_id=self.agent_id,
            receiver_id=receiver_id,
            content=content,
            chain_id=chain_id
        )
        
        # Add the message to the chain
        self.active_chains[chain_id].add_message(message)
        
        logger.info(f"Sent message from {self.agent_id} to {receiver_id} in chain {chain_id}")
        return message
    
    def receive_message(self, message: Dict[str, Any]) -> bool:
        """
        Process a received message.
        
        Args:
            message: The received message
            
        Returns:
            True if the message was processed successfully, False otherwise
        """
        # Validate the message
        if not self.protocol.validate_message(message):
            logger.error(f"Received invalid message: {message}")
            return False
        
        # Check if the message is intended for this agent
        if message.get("receiver") != self.agent_id:
            logger.warning(f"Received message intended for {message.get('receiver')}, not {self.agent_id}")
            return False
        
        # Get or create the chain
        chain_id = message.get("chain_id")
        if chain_id not in self.active_chains:
            self.active_chains[chain_id] = Chain(chain_id=chain_id)
        
        # Add the message to the chain
        self.active_chains[chain_id].add_message(message)
        
        # Handle the message based on its type
        content = message.get("content", {})
        message_type = content.get("type", "unknown")
        
        if message_type in self.message_handlers:
            for handler in self.message_handlers[message_type]:
                try:
                    handler(message)
                except Exception as e:
                    logger.error(f"Error handling message: {e}")
                    return False
        else:
            logger.warning(f"No handler registered for message type: {message_type}")
        
        logger.info(f"Received message from {message.get('sender')} in chain {chain_id}")
        return True
    
    def get_chain(self, chain_id: str) -> Optional[Chain]:
        """
        Get a chain by its ID.
        
        Args:
            chain_id: The ID of the chain to retrieve
            
        Returns:
            The Chain if found, None otherwise
        """
        return self.active_chains.get(chain_id)
    
    def get_agent_info(self) -> Dict[str, Any]:
        """
        Get information about this agent.
        
        Returns:
            Dictionary with agent information
        """
        return {
            "agent_id": self.agent_id,
            "agent_type": self.agent_type,
            "active_chains": len(self.active_chains),
            "created_at": self.created_at,
            "uptime_seconds": time.time() - self.created_at
        } 