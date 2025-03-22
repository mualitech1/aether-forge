"""
MCP Example

This script demonstrates how to use the Multi-Chain Protocol (MCP) system.
"""

import logging
import time
import sys
import os

# Add the project root directory to the path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from src.agents.mcp.mcp_agent import MCPAgent
from src.core.mcp.chain import Chain
from src.core.mcp.manager import ChainManager

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler("logs/mcp_example.log")
    ]
)

logger = logging.getLogger(__name__)

def handle_query(message):
    """Handle a query message."""
    logger.info(f"Handling query: {message['content']['query']}")
    # In a real implementation, this would process the query and generate a response

def handle_response(message):
    """Handle a response message."""
    logger.info(f"Handling response: {message['content']['response']}")
    # In a real implementation, this would process the response

def main():
    """Main function demonstrating MCP functionality."""
    logger.info("Starting MCP example")
    
    # Create a ChainManager
    chain_manager = ChainManager()
    
    # Create two agents
    agent1 = MCPAgent(agent_type="requester")
    agent2 = MCPAgent(agent_type="responder")
    
    # Register message handlers
    agent1.register_message_handler("response", handle_response)
    agent2.register_message_handler("query", handle_query)
    
    logger.info(f"Created agents: {agent1.agent_id} and {agent2.agent_id}")
    
    # Create a new chain
    chain = chain_manager.create_chain()
    chain_id = chain.chain_id
    
    logger.info(f"Created chain: {chain_id}")
    
    # Agent 1 sends a query to Agent 2
    message1 = agent1.send_message(
        receiver_id=agent2.agent_id,
        content={
            "type": "query",
            "query": "What is the current system status?",
            "timestamp": time.time()
        },
        chain_id=chain_id
    )
    
    logger.info(f"Agent 1 sent a query to Agent 2: {message1['content']['query']}")
    
    # Agent 2 receives the message
    agent2.receive_message(message1)
    
    # Agent 2 sends a response to Agent 1
    message2 = agent2.send_message(
        receiver_id=agent1.agent_id,
        content={
            "type": "response",
            "response": "All systems operational",
            "status": "green",
            "timestamp": time.time()
        },
        chain_id=chain_id
    )
    
    logger.info(f"Agent 2 sent a response to Agent 1: {message2['content']['response']}")
    
    # Agent 1 receives the response
    agent1.receive_message(message2)
    
    # Get chain information
    chain = chain_manager.get_chain(chain_id)
    logger.info(f"Chain {chain_id} has {len(chain.messages)} messages")
    
    # Terminate the chain
    chain_manager.terminate_chain(chain_id)
    logger.info(f"Terminated chain: {chain_id}")
    
    # Show chain manager stats
    stats = chain_manager.get_stats()
    logger.info(f"Chain manager stats: {stats}")
    
    logger.info("MCP example completed successfully")

if __name__ == "__main__":
    main() 