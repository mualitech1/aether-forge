"""
Multi-Chain Protocol (MCP) module for enabling communication between agents.
"""

from src.core.mcp.protocol import MCPProtocol
from src.core.mcp.chain import Chain
from src.core.mcp.manager import ChainManager

__all__ = ["MCPProtocol", "Chain", "ChainManager"] 