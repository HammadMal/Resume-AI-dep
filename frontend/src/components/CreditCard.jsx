import React from 'react';

const CreditCard = ({ cardNumber, cardName, expiryDate, cvv, flipped }) => {
    const formatCardNumber = (number) => {
        return number.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    };

    const getCardType = (number) => {
        if (!number) return '';
        // Remove all spaces
        const cleanNumber = number.replace(/\s/g, '');
        // Visa cards start with 4
        if (cleanNumber.startsWith('4')) return 'visa';
        // Mastercard starts with 51-55 or 2221-2720
        if (/^5[1-5]/.test(cleanNumber) || 
            (/^2[2-7]/.test(cleanNumber) && cleanNumber.length >= 4 && 
             parseInt(cleanNumber.substring(0, 4)) >= 2221 && 
             parseInt(cleanNumber.substring(0, 4)) <= 2720)) {
            return 'mastercard';
        }
        return '';
    };
    
    const cardType = getCardType(cardNumber);

    return (
        <div className="perspective-1000 mb-8">
            <div className={`relative w-96 h-56 rounded-2xl transition-transform duration-700 transform-style-preserve-3d shadow-xl ${flipped ? 'rotate-y-180' : ''}`}
                 style={{ 
                     transformStyle: 'preserve-3d', 
                     perspective: '1000px',
                     transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                 }}>
                {/* Front of card */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6"
                     style={{ backfaceVisibility: 'hidden' }}>
                    <div className="flex justify-between items-start">
                        <div className="space-y-4">
                            <div className="h-12 w-16 flex items-center">
                                {cardType === 'visa' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" className="w-12 h-12">
                                        <path fill="#fff" d="M44 24C44 35.046 35.046 44 24 44C12.954 44 4 35.046 4 24C4 12.954 12.954 4 24 4C35.046 4 44 12.954 44 24Z"/>
                                        <path d="M20.052 28.789H16.666L18.494 19.2H21.88L20.052 28.789Z" fill="#00579F"/>
                                        <path d="M32.400 19.437C31.603 19.127 30.368 18.8 28.851 18.8C25.843 18.8 23.687 20.337 23.673 22.568C23.659 24.189 25.209 25.091 26.380 25.631C27.581 26.186 27.983 26.546 27.976 27.046C27.970 27.806 27.025 28.149 26.146 28.149C24.960 28.149 24.325 27.954 23.287 27.514L22.893 27.343L22.466 30.034C23.416 30.445 25.209 30.811 27.068 30.825C30.270 30.825 32.386 29.309 32.413 26.933C32.427 25.671 31.591 24.717 29.796 23.900C28.744 23.389 28.084 23.037 28.091 22.498C28.091 22.011 28.663 21.492 29.882 21.492C30.903 21.479 31.644 21.723 32.199 21.977L32.493 22.111L32.920 19.545L32.400 19.437Z" fill="#00579F"/>
                                        <path d="M35.891 28.789H38.572L36.744 19.2H34.325C33.328 19.2 32.547 19.483 32.064 20.571L27.637 28.789H30.839L31.469 27.183H35.384L35.891 28.789ZM32.427 24.914L33.928 21.326L34.803 24.914H32.427Z" fill="#00579F"/>
                                        <path d="M15.476 19.2L12.461 25.671L12.170 24.269C11.677 22.729 10.203 21.042 8.531 20.162L11.303 28.789H14.532L19.432 19.2H15.476Z" fill="#00579F"/>
                                        <path d="M9.949 19.2H5.106L5.051 19.451C8.884 20.337 11.342 22.580 12.170 25.268L11.154 20.571C10.959 19.508 10.105 19.227 9.949 19.2Z" fill="#FAA61A"/>
                                    </svg>
                                ) : cardType === 'mastercard' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" className="w-12 h-12">
                                        <path d="M44 24C44 35.046 35.046 44 24 44C12.954 44 4 35.046 4 24C4 12.954 12.954 4 24 4C35.046 4 44 12.954 44 24Z" fill="white"/>
                                        <path d="M24 31.428C21.498 29.302 19.9 26.242 19.9 22.836C19.9 19.43 21.498 16.37 24 14.244C26.502 16.37 28.1 19.43 28.1 22.836C28.1 26.242 26.502 29.302 24 31.428Z" fill="#FF5F00"/>
                                        <path d="M24 14.244C26.502 16.37 28.1 19.43 28.1 22.836C28.1 26.242 26.502 29.302 24 31.428C27.588 33.554 32.004 33.554 35.593 31.428C39.181 29.302 41.606 25.194 41.606 20.383C41.606 15.572 39.181 11.464 35.593 9.338C32.004 7.212 27.588 7.212 24 9.338Z" fill="#EB001B"/>
                                        <path d="M6.394 20.384C6.394 25.195 8.819 29.303 12.407 31.429C15.996 33.555 20.412 33.555 24 31.429C21.498 29.303 19.9 26.243 19.9 22.837C19.9 19.43 21.498 16.371 24 14.244C20.412 12.119 15.996 12.119 12.407 14.244C8.819 16.371 6.394 20.479 6.394 20.384Z" fill="#F79E1B"/>
                                    </svg>
                                ) : (
                                    <div className="w-12 h-10 border-2 border-white/50 rounded-md flex items-center justify-center text-white/70 text-xs">
                                        CARD
                                    </div>
                                )}
                            </div>
                            <div className="text-2xl font-medium tracking-widest text-white mt-8">
                                {formatCardNumber(cardNumber || '•••• •••• •••• ••••')}
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm" />
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex justify-between">
                            <div>
                                <div className="text-xs text-white/60 uppercase">Card Holder</div>
                                <div className="text-white font-medium tracking-wider">
                                    {cardName || 'YOUR NAME'}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-white/60 uppercase">Expires</div>
                                <div className="text-white font-medium tracking-wider">
                                    {expiryDate || 'MM/YY'}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-4 right-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                        </svg>
                    </div>
                </div>

                {/* Back of card */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl"
                     style={{ 
                         backfaceVisibility: 'hidden',
                         transform: 'rotateY(180deg)'
                     }}>
                    <div className="w-full h-12 bg-black/30 mt-8" />
                    <div className="px-6 mt-6">
                        <div className="flex justify-end items-center space-x-2 mt-8">
                            <div className="text-xs text-white/60 uppercase">CVV</div>
                            <div className="bg-white/20 backdrop-blur-sm rounded px-6 py-2">
                                <span className="text-white font-medium tracking-widest">
                                    {cvv || '•••'}
                                </span>
                            </div>
                        </div>
                        <div className="absolute bottom-6 right-6">
                            {cardType === 'visa' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="16" viewBox="0 0 48 16" fill="none">
                                    <path d="M17.415 15.239H13.142L15.433 0.761H19.706L17.415 15.239Z" fill="white"/>
                                    <path d="M32.681 1.070C31.702 0.685 30.191 0.285 28.340 0.285C24.600 0.285 21.913 2.229 21.895 5.041C21.879 7.157 23.825 8.314 25.282 9.012C26.774 9.727 27.264 10.193 27.257 10.841C27.249 11.809 26.073 12.245 24.971 12.245C23.453 12.245 22.669 12 21.403 11.444L20.913 11.230L20.388 14.691C21.563 15.212 23.825 15.682 26.159 15.698C30.139 15.698 32.785 13.783 32.818 10.720C32.836 9.077 31.805 7.858 29.587 6.810C28.289 6.163 27.471 5.716 27.479 5.036C27.479 4.423 28.181 3.781 29.702 3.781C30.981 3.764 31.907 4.072 32.587 4.391L32.948 4.561L33.470 1.211L32.681 1.070Z" fill="white"/>
                                    <path d="M37.135 10.036C37.425 9.268 38.563 6.067 38.563 6.067C38.545 6.099 38.850 5.304 39.028 4.821L39.275 5.949C39.275 5.949 39.982 9.333 40.120 10.036C39.655 10.036 37.731 10.036 37.135 10.036ZM42.245 0.761H38.958C38.180 0.761 37.576 0.985 37.218 1.696L31.983 15.239H35.998L36.861 12.690H41.228L41.722 15.239H45.317L42.245 0.761Z" fill="white"/>
                                    <path d="M13.798 0.761L10.108 10.876L9.748 9.077C9.134 7.052 7.284 4.862 5.217 3.744L8.591 15.222H12.656L18.777 0.761H13.798Z" fill="white"/>
                                    <path d="M6.478 0.761H0.158L0.092 1.070C5.112 2.177 8.140 5.233 9.133 9.077L7.875 1.696C7.632 0.985 7.110 0.776 6.478 0.761Z" fill="#F79E1B"/>
                                </svg>
                            ) : cardType === 'mastercard' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="30" viewBox="0 0 48 30" fill="none">
                                    <path d="M17.4 24.0001H30.6V21.6001H17.4V24.0001Z" fill="white"/>
                                    <path d="M18.525 15.6001C18.525 17.3316 19.95 18.7501 21.675 18.7501C22.275 18.7501 22.875 18.5316 23.325 18.1761C23.775 18.5316 24.375 18.7501 24.975 18.7501C26.7 18.7501 28.125 17.3316 28.125 15.6001C28.125 13.8686 26.7 12.4501 24.975 12.4501C24.375 12.4501 23.775 12.6686 23.325 13.0241C22.875 12.6686 22.275 12.4501 21.675 12.4501C19.95 12.4501 18.525 13.8686 18.525 15.6001ZM24.975 13.5001C26.1 13.5001 27 14.4016 27 15.6001C27 16.7986 26.1 17.7001 24.975 17.7001C23.85 17.7001 22.95 16.7986 22.95 15.6001C22.95 14.4016 23.85 13.5001 24.975 13.5001ZM21.675 13.5001C22.8 13.5001 23.7 14.4016 23.7 15.6001C23.7 16.7986 22.8 17.7001 21.675 17.7001C20.55 17.7001 19.65 16.7986 19.65 15.6001C19.65 14.4016 20.55 13.5001 21.675 13.5001Z" fill="white"/>
                                    <path d="M38.775 15.6001C38.775 17.3316 40.2 18.7501 41.925 18.7501C43.65 18.7501 45.075 17.3316 45.075 15.6001C45.075 13.8686 43.65 12.4501 41.925 12.4501C40.2 12.4501 38.775 13.8686 38.775 15.6001ZM43.95 15.6001C43.95 16.7986 43.05 17.7001 41.925 17.7001C40.8 17.7001 39.9 16.7986 39.9 15.6001C39.9 14.4016 40.8 13.5001 41.925 13.5001C43.05 13.5001 43.95 14.4016 43.95 15.6001Z" fill="white"/>
                                    <path d="M32.925 15.6001C32.925 17.3316 34.35 18.7501 36.075 18.7501C36.675 18.7501 37.275 18.5316 37.725 18.1761L37.8 18.1001L37.8 18.6001H38.85V12.6001H37.8V13.1001L37.725 13.0241C37.275 12.6686 36.675 12.4501 36.075 12.4501C34.35 12.4501 32.925 13.8686 32.925 15.6001ZM38.1 15.6001C38.1 16.7986 37.2 17.7001 36.075 17.7001C34.95 17.7001 34.05 16.7986 34.05 15.6001C34.05 14.4016 34.95 13.5001 36.075 13.5001C37.2 13.5001 38.1 14.4016 38.1 15.6001Z" fill="white"/>
                                    <path d="M29.175 18.6001H30.225V12.6001H29.175V18.6001Z" fill="white"/>
                                    <path d="M8.85 12.6001H7.65V9.9001H6.525V12.6001H5.775V13.6501H6.525V16.8001C6.525 18.0001 7.05 18.7501 8.4 18.7501C8.775 18.7501 9.225 18.6001 9.525 18.3751L9.225 17.4001C9 17.5516 8.775 17.6251 8.475 17.6251C7.95 17.6251 7.65 17.3251 7.65 16.7251V13.6501H8.85V12.6001Z" fill="white"/>
                                    <path d="M14.175 12.4501C13.65 12.4501 13.125 12.6686 12.825 13.1001V12.6001H11.775V18.6001H12.825V15.1501C12.825 14.1751 13.425 13.5751 14.325 13.5751C14.475 13.5751 14.625 13.5751 14.775 13.6501L15.075 12.5251C14.775 12.4501 14.475 12.4501 14.175 12.4501Z" fill="white"/>
                                    <path d="M10.35 15.6001C10.35 17.3316 11.775 18.7501 13.5 18.7501C14.1 18.7501 14.625 18.6001 15.075 18.3001L14.775 17.4001C14.4 17.6251 13.95 17.7001 13.5 17.7001C12.375 17.7001 11.475 16.7986 11.475 15.6001C11.475 14.4016 12.375 13.5001 13.5 13.5001C13.95 13.5001 14.4 13.5751 14.775 13.8001L15.075 12.9001C14.625 12.6001 14.1 12.4501 13.5 12.4501C11.775 12.4501 10.35 13.8686 10.35 15.6001Z" fill="white"/>
                                    <path d="M30.225 10.3876H29.175V12.6001H30.225V10.3876Z" fill="white"/>
                                    <path d="M3.225 12.6001L2.025 16.5751L0.825 12.6001H0L1.8 18.6001H2.25L3.525 14.4001L4.8 18.6001H5.25L7.05 12.6001H6.225L5.025 16.5751L3.825 12.6001H3.225Z" fill="white"/>
                                </svg>
                            ) : (
                                <div className="w-12 h-10 border-2 border-white/50 rounded-md flex items-center justify-center text-white/70 text-xs">
                                    CARD
                                </div>
                            )}
                        </div>
                        <div className="mt-10 text-white/50 text-xs max-w-[70%]">
                            This card is issued by Bank of Earth and remains property of the same.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreditCard;