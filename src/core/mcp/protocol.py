"""
MCP Protocol Implementation

This module defines the core protocol for Multi-Chain communication between agents.
"""

import json
import uuid
import time
import logging
from typing import Dict, Any, Optional, List

logger = logging.getLogger(__name__)

class MCPProtocol:
    """Main protocol implementation for Multi-Chain Protocol."""
    
    VERSION = "1.0"
    
    def __init__(self, secure_mode: bool = True):
        """
        Initialize the MCP Protocol.
        
        Args:
            secure_mode: Whether to enable secure mode with encryption
        """
        self.secure_mode = secure_mode
        self.protocol_id = str(uuid.uuid4())
        self.created_at = time.time()
        logger.info(f"Initialized MCP Protocol v{self.VERSION} (ID: {self.protocol_id})")
    
    def create_message(self, 
                      sender_id: str, 
                      receiver_id: str, 
                      content: Dict[str, Any],
                      chain_id: Optional[str] = None) -> Dict[str, Any]:
        """
        Create a protocol-compliant message.
        
        Args:
            sender_id: ID of the sending agent
            receiver_id: ID of the receiving agent
            content: Message payload
            chain_id: Optional chain ID for existing chains
            
        Returns:
            A formatted message dictionary
        """
        if chain_id is None:
            chain_id = str(uuid.uuid4())
            
        message = {
            "protocol_version": self.VERSION,
            "message_id": str(uuid.uuid4()),
            "chain_id": chain_id,
            "timestamp": time.time(),
            "sender": sender_id,
            "receiver": receiver_id,
            "content": content,
            "secure": self.secure_mode
        }
        
        if self.secure_mode:
            # In a real implementation, we would encrypt the content here
            message["encrypted"] = True
            
        return message
    
    def validate_message(self, message: Dict[str, Any]) -> bool:
        """
        Validate that a message conforms to the protocol.
        
        Args:
            message: The message to validate
            
        Returns:
            True if valid, False otherwise
        """
        required_fields = [
            "protocol_version", "message_id", "chain_id", 
            "timestamp", "sender", "receiver", "content"
        ]
        
        # Check all required fields exist
        if not all(field in message for field in required_fields):
            logger.error(f"Message missing required fields: {message}")
            return False
            
        # Validate protocol version
        if message["protocol_version"] != self.VERSION:
            logger.error(f"Protocol version mismatch: {message['protocol_version']} != {self.VERSION}")
            return False
            
        # Additional validation logic here
        
        return True
    
    def serialize(self, message: Dict[str, Any]) -> str:
        """
        Serialize a message to JSON string.
        
        Args:
            message: The message to serialize
            
        Returns:
            JSON string representation
        """
        return json.dumps(message)
    
    def deserialize(self, data: str) -> Dict[str, Any]:
        """
        Deserialize a JSON string to a message.
        
        Args:
            data: JSON string to deserialize
            
        Returns:
            Message dictionary
        """
        try:
            message = json.loads(data)
            if not self.validate_message(message):
                raise ValueError("Invalid message format")
            return message
        except json.JSONDecodeError:
            logger.error("Failed to deserialize message")
            raise 