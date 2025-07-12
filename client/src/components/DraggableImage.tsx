import { useState, useRef, useCallback, useEffect } from "react";
import { RotateCw, FlipHorizontal, Move, CornerRightDown, Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

interface DraggableImageProps {
  id: string;
  src: string;
  position: Position;
  size: Size;
  rotation: number;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onMove: (id: string, deltaX: number, deltaY: number) => void;
  onResize: (id: string, newWidth: number, newHeight: number) => void;
  onRotate: (id: string, rotation: number) => void;
  onFlip: (id: string) => void;
  onDelete: (id: string) => void;
  canvasBounds: { width: number; height: number };
  maintainAspectRatio: boolean;
  onAspectRatioToggle: (id: string) => void;
}

export function DraggableImage({
  id,
  src,
  position,
  size,
  rotation,
  isSelected,
  onSelect,
  onMove,
  onResize,
  onRotate,
  onFlip,
  onDelete,
  canvasBounds,
  maintainAspectRatio,
  onAspectRatioToggle
}: DraggableImageProps) {
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
  const [initialSize, setInitialSize] = useState<Size>({ width: 0, height: 0 });
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (size.width > 0 && size.height > 0) {
      setAspectRatio(size.width / size.height);
    }
  }, [size]);

  // Handle mouse/touch events for dragging
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (e.target === imageRef.current) {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
      onSelect(id);
    }
  }, [position, id, onSelect]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (isDragging && !isResizing) {
      e.preventDefault();
      const newX = Math.max(0, Math.min(canvasBounds.width - size.width, e.clientX - dragStart.x));
      const newY = Math.max(0, Math.min(canvasBounds.height - size.height, e.clientY - dragStart.y));
      onMove(id, newX - position.x, newY - position.y);
    }
  }, [isDragging, isResizing, dragStart, canvasBounds, size, position, id, onMove]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeHandle(null);
  }, []);

  // Handle resize handles
  const handleResizeStart = useCallback((e: React.PointerEvent, handle: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeHandle(handle);
    setDragStart({ x: e.clientX, y: e.clientY });
    setInitialSize({ width: size.width, height: size.height });
    onSelect(id);
  }, [size, id, onSelect]);

  const handleResizeMove = useCallback((e: React.PointerEvent) => {
    if (!isResizing || !resizeHandle) return;

    e.preventDefault();
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    let newWidth = initialSize.width;
    let newHeight = initialSize.height;

    switch (resizeHandle) {
      case 'nw':
        newWidth = Math.max(20, initialSize.width - deltaX);
        newHeight = maintainAspectRatio ? newWidth / aspectRatio : Math.max(20, initialSize.height - deltaY);
        break;
      case 'ne':
        newWidth = Math.max(20, initialSize.width + deltaX);
        newHeight = maintainAspectRatio ? newWidth / aspectRatio : Math.max(20, initialSize.height - deltaY);
        break;
      case 'sw':
        newWidth = Math.max(20, initialSize.width - deltaX);
        newHeight = maintainAspectRatio ? newWidth / aspectRatio : Math.max(20, initialSize.height + deltaY);
        break;
      case 'se':
        newWidth = Math.max(20, initialSize.width + deltaX);
        newHeight = maintainAspectRatio ? newWidth / aspectRatio : Math.max(20, initialSize.height + deltaY);
        break;
      case 'n':
        if (!maintainAspectRatio) {
          newHeight = Math.max(20, initialSize.height - deltaY);
        }
        break;
      case 's':
        if (!maintainAspectRatio) {
          newHeight = Math.max(20, initialSize.height + deltaY);
        }
        break;
      case 'w':
        if (!maintainAspectRatio) {
          newWidth = Math.max(20, initialSize.width - deltaX);
        }
        break;
      case 'e':
        if (!maintainAspectRatio) {
          newWidth = Math.max(20, initialSize.width + deltaX);
        }
        break;
    }

    // Constrain to canvas bounds
    newWidth = Math.min(newWidth, canvasBounds.width - position.x);
    newHeight = Math.min(newHeight, canvasBounds.height - position.y);

    onResize(id, newWidth, newHeight);
  }, [isResizing, resizeHandle, dragStart, initialSize, maintainAspectRatio, aspectRatio, canvasBounds, position, id, onResize]);

  // Global event listeners for pointer events
  useEffect(() => {
    const handleGlobalPointerMove = (e: PointerEvent) => {
      if (isDragging || isResizing) {
        const syntheticEvent = {
          ...e,
          clientX: e.clientX,
          clientY: e.clientY,
          preventDefault: () => e.preventDefault(),
          stopPropagation: () => e.stopPropagation()
        } as React.PointerEvent;

        if (isDragging) {
          handlePointerMove(syntheticEvent);
        } else if (isResizing) {
          handleResizeMove(syntheticEvent);
        }
      }
    };

    const handleGlobalPointerUp = () => {
      handlePointerUp();
    };

    if (isDragging || isResizing) {
      document.addEventListener('pointermove', handleGlobalPointerMove);
      document.addEventListener('pointerup', handleGlobalPointerUp);
    }

    return () => {
      document.removeEventListener('pointermove', handleGlobalPointerMove);
      document.removeEventListener('pointerup', handleGlobalPointerUp);
    };
  }, [isDragging, isResizing, handlePointerMove, handleResizeMove, handlePointerUp]);

  const resizeHandles = [
    { id: 'nw', className: 'top-0 left-0 cursor-nw-resize', style: { transform: 'translate(-50%, -50%)' } },
    { id: 'ne', className: 'top-0 right-0 cursor-ne-resize', style: { transform: 'translate(50%, -50%)' } },
    { id: 'sw', className: 'bottom-0 left-0 cursor-sw-resize', style: { transform: 'translate(-50%, 50%)' } },
    { id: 'se', className: 'bottom-0 right-0 cursor-se-resize', style: { transform: 'translate(50%, 50%)' } },
    { id: 'n', className: 'top-0 left-1/2 cursor-n-resize', style: { transform: 'translate(-50%, -50%)' } },
    { id: 's', className: 'bottom-0 left-1/2 cursor-s-resize', style: { transform: 'translate(-50%, 50%)' } },
    { id: 'w', className: 'top-1/2 left-0 cursor-w-resize', style: { transform: 'translate(-50%, -50%)' } },
    { id: 'e', className: 'top-1/2 right-0 cursor-e-resize', style: { transform: 'translate(50%, -50%)' } },
  ];

  return (
    <div
      ref={containerRef}
      className={`absolute select-none touch-none ${isSelected ? 'z-10' : 'z-0'}`}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: 'center center'
      }}
    >
      {/* Main Image */}
      <img
        ref={imageRef}
        src={src}
        alt="Canvas image"
        className={`w-full h-full object-contain ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} ${
          isSelected ? 'ring-2 ring-blue-500' : ''
        }`}
        style={{ userSelect: 'none' }}
        onPointerDown={handlePointerDown}
        onLoad={() => {
          if (imageRef.current) {
            const { naturalWidth, naturalHeight } = imageRef.current;
            if (naturalWidth > 0 && naturalHeight > 0) {
              setAspectRatio(naturalWidth / naturalHeight);
            }
          }
        }}
      />

      {/* Resize Handles */}
      {isSelected && (
        <>
          {resizeHandles.map((handle) => (
            <div
              key={handle.id}
              className={`absolute w-3 h-3 bg-blue-500 border-2 border-white rounded-full ${handle.className} hover:bg-blue-600 transition-colors`}
              style={handle.style}
              onPointerDown={(e) => handleResizeStart(e, handle.id)}
            />
          ))}

          {/* Control Buttons */}
          <div className="absolute -top-12 left-0 flex items-center space-x-1 bg-white rounded-lg shadow-lg p-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onAspectRatioToggle(id)}
              className="h-8 w-8 p-0"
              title={t({ ko: '비율 고정', en: 'Lock Aspect Ratio', ja: '比率固定', zh: '锁定比例' })}
            >
              {maintainAspectRatio ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onRotate(id, rotation + 90)}
              className="h-8 w-8 p-0"
              title={t({ ko: '회전', en: 'Rotate', ja: '回転', zh: '旋转' })}
            >
              <RotateCw className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onFlip(id)}
              className="h-8 w-8 p-0"
              title={t({ ko: '뒤집기', en: 'Flip', ja: '反転', zh: '翻转' })}
            >
              <FlipHorizontal className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(id)}
              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
              title={t({ ko: '삭제', en: 'Delete', ja: '削除', zh: '删除' })}
            >
              ×
            </Button>
          </div>

          {/* Position and Size Info */}
          <div className="absolute -bottom-16 left-0 bg-black/75 text-white text-xs rounded px-2 py-1">
            X: {Math.round(position.x)} Y: {Math.round(position.y)} W: {Math.round(size.width)} H: {Math.round(size.height)}
          </div>
        </>
      )}
    </div>
  );
}