// Mock Web3 functionality for demo purposes
export const connectWallet = async (): Promise<string> => {
  // Simulate wallet connection delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock wallet address
  return "0x1234567890123456789012345678901234567890";
};

export const getWalletBalance = async (address: string): Promise<number> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  // Mock balance
  return 5000;
};

export const executeInvestment = async (
  propertyId: string,
  amount: number,
  shares: number
): Promise<string> => {
  // Simulate transaction delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock transaction hash
  return `0x${Math.random().toString(16).substr(2, 64)}`;
};

export const formatWalletAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};