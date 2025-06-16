// 'use client';

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { Wallet, Loader2, CheckCircle, XCircle } from 'lucide-react';
// import { useAppStore } from '@/lib/store';
// import { connectWallet as connectWalletAPI } from '@/lib/web3';

// interface WalletConnectProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export default function WalletConnect({ isOpen, onClose }: WalletConnectProps) {
//   const [isConnecting, setIsConnecting] = useState(false);
//   const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'success' | 'error'>('idle');
//   // const { connectWallet, setUser } = useAppStore();

//   const handleConnect = async () => {
//     setIsConnecting(true);
//     setConnectionStatus('connecting');

//     try {
//       const address = await connectWalletAPI();
      
//       // Mock user data
//       const userData = {
//         id: "1",
//         name: "Alex Thompson",
//         email: "alex@example.com",
//         walletAddress: address,
//         balance: 5000,
//         totalInvested: 0,
//         portfolioValue: 0,
//         investments: []
//       };

//       setUser(userData);
//       connectWallet();
//       setConnectionStatus('success');
      
//       setTimeout(() => {
//         onClose();
//         setConnectionStatus('idle');
//       }, 1500);
//     } catch (error) {
//       setConnectionStatus('error');
//       setTimeout(() => {
//         setConnectionStatus('idle');
//       }, 2000);
//     } finally {
//       setIsConnecting(false);
//     }
//   };

//   const walletOptions = [
//     {
//       name: 'MetaMask',
//       description: 'Connect using MetaMask wallet',
//       icon: '🦊',
//       popular: true
//     },
//     {
//       name: 'WalletConnect',
//       description: 'Connect using WalletConnect',
//       icon: '🔗',
//       popular: false
//     },
//     {
//       name: 'Coinbase Wallet',
//       description: 'Connect using Coinbase Wallet',
//       icon: '🔵',
//       popular: false
//     }
//   ];

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-md bg-slate-900 border-slate-800">
//         <DialogHeader>
//           <DialogTitle className="text-white">Connect Your Wallet</DialogTitle>
//         </DialogHeader>
        
//         <div className="space-y-4">
//           {connectionStatus === 'idle' && (
//             <>
//               <p className="text-sm text-slate-400">
//                 Choose your preferred wallet to connect and start investing in real estate.
//               </p>
              
//               <div className="space-y-3">
//                 {walletOptions.map((wallet) => (
//                   <Card 
//                     key={wallet.name}
//                     className="bg-slate-800 border-slate-700 hover:bg-slate-750 cursor-pointer transition-colors"
//                     onClick={handleConnect}
//                   >
//                     <CardContent className="flex items-center justify-between p-4">
//                       <div className="flex items-center space-x-3">
//                         <span className="text-2xl">{wallet.icon}</span>
//                         <div>
//                           <div className="flex items-center space-x-2">
//                             <h3 className="font-medium text-white">{wallet.name}</h3>
//                             {wallet.popular && (
//                               <span className="text-xs bg-indigo-500 text-white px-2 py-1 rounded">
//                                 Popular
//                               </span>
//                             )}
//                           </div>
//                           <p className="text-sm text-slate-400">{wallet.description}</p>
//                         </div>
//                       </div>
//                       <Wallet className="w-5 h-5 text-slate-400" />
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </>
//           )}

//           {connectionStatus === 'connecting' && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="text-center py-8"
//             >
//               <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-500 mb-4" />
//               <h3 className="text-lg font-medium text-white mb-2">Connecting...</h3>
//               <p className="text-sm text-slate-400">
//                 Please confirm the connection in your wallet.
//               </p>
//             </motion.div>
//           )}

//           {connectionStatus === 'success' && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="text-center py-8"
//             >
//               <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-white mb-2">Connected!</h3>
//               <p className="text-sm text-slate-400">
//                 Your wallet has been successfully connected.
//               </p>
//             </motion.div>
//           )}

//           {connectionStatus === 'error' && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="text-center py-8"
//             >
//               <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-white mb-2">Connection Failed</h3>
//               <p className="text-sm text-slate-400 mb-4">
//                 Unable to connect to your wallet. Please try again.
//               </p>
//               <Button
//                 onClick={() => setConnectionStatus('idle')}
//                 variant="outline"
//                 className="border-slate-700 text-slate-300"
//               >
//                 Try Again
//               </Button>
//             </motion.div>
//           )}
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }