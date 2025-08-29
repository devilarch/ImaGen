/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { LinkIcon } from './icons';

interface ResizePanelProps {
  onApplyResize: (width: number, height: number) => void;
  isLoading: boolean;
  imageWidth: number;
  imageHeight: number;
}

const ResizePanel: React.FC<ResizePanelProps> = ({ onApplyResize, isLoading, imageWidth, imageHeight }) => {
  const [width, setWidth] = useState<number>(imageWidth);
  const [height, setHeight] = useState<number>(imageHeight);
  const [keepAspectRatio, setKeepAspectRatio] = useState<boolean>(true);

  useEffect(() => {
    setWidth(imageWidth);
    setHeight(imageHeight);
  }, [imageWidth, imageHeight]);
  
  const aspectRatio = imageWidth / imageHeight;

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(e.target.value, 10) || 0;
    setWidth(newWidth);
    if (keepAspectRatio && aspectRatio > 0) {
      setHeight(Math.round(newWidth / aspectRatio));
    }
  };
  
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseInt(e.target.value, 10) || 0;
    setHeight(newHeight);
    if (keepAspectRatio && aspectRatio > 0) {
      setWidth(Math.round(newHeight * aspectRatio));
    }
  };

  const handleApply = () => {
    if (width > 0 && height > 0) {
      onApplyResize(width, height);
    }
  };

  const hasChanged = width !== imageWidth || height !== imageHeight;

  return (
    <div className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex flex-col items-center gap-4 animate-fade-in backdrop-blur-sm">
      <h3 className="text-lg font-semibold text-gray-300">Resize Image</h3>
      <p className="text-sm text-gray-400 -mt-2">Enter new dimensions for your image.</p>
      
      <div className="flex items-center justify-center gap-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="width" className="text-xs text-gray-400 px-1">Width</label>
          <input
            id="width"
            type="number"
            value={width}
            onChange={handleWidthChange}
            disabled={isLoading}
            className="w-28 bg-gray-900/50 border border-gray-600 text-gray-200 rounded-md p-2 text-center focus:ring-1 focus:ring-blue-500 focus:outline-none transition disabled:opacity-50"
          />
        </div>
        
        <button 
          onClick={() => setKeepAspectRatio(!keepAspectRatio)} 
          className={`mt-5 p-2 rounded-md transition-colors duration-200 ${keepAspectRatio ? 'bg-blue-600 text-white' : 'bg-white/10 hover:bg-white/20 text-gray-300'}`}
          aria-label="Toggle aspect ratio lock"
          title={keepAspectRatio ? 'Unlock aspect ratio' : 'Lock aspect ratio'}
        >
          <LinkIcon className="w-5 h-5" />
        </button>

        <div className="flex flex-col gap-1">
          <label htmlFor="height" className="text-xs text-gray-400 px-1">Height</label>
          <input
            id="height"
            type="number"
            value={height}
            onChange={handleHeightChange}
            disabled={isLoading}
            className="w-28 bg-gray-900/50 border border-gray-600 text-gray-200 rounded-md p-2 text-center focus:ring-1 focus:ring-blue-500 focus:outline-none transition disabled:opacity-50"
          />
        </div>
      </div>

      <button
        onClick={handleApply}
        disabled={isLoading || !hasChanged || width <= 0 || height <= 0}
        className="w-full max-w-xs mt-2 bg-gradient-to-br from-green-600 to-green-500 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/40 hover:-translate-y-px active:scale-95 active:shadow-inner text-base disabled:from-green-800 disabled:to-green-700 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
      >
        Apply Resize
      </button>
    </div>
  );
};

export default ResizePanel;
