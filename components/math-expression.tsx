"use client"

import { BlockMath, InlineMath } from "react-katex"
import "katex/dist/katex.min.css"
import { useState } from "react"

interface MathExpressionProps {
  math: string
  display?: boolean
  className?: string
  editable?: boolean
  onEdit?: (newMath: string) => void
}

export default function MathExpression({
  math,
  display = false,
  className = "",
  editable = false,
  onEdit,
}: MathExpressionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(math)

  const handleSave = () => {
    onEdit?.(editValue)
    setIsEditing(false)
  }

  if (editable && isEditing) {
    return (
      <div className={`inline-flex items-center space-x-2 ${className}`}>
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="px-2 py-1 border rounded text-sm font-mono"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave()
            if (e.key === "Escape") setIsEditing(false)
          }}
        />
        <button onClick={handleSave} className="px-2 py-1 bg-blue-500 text-white rounded text-xs">
          Save
        </button>
      </div>
    )
  }

  try {
    const MathComponent = display ? BlockMath : InlineMath
    return (
      <div
        className={`${className} ${editable ? "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-1" : ""}`}
        onClick={editable ? () => setIsEditing(true) : undefined}
      >
        <MathComponent math={math} />
      </div>
    )
  } catch (error) {
    return (
      <span className="text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded text-sm">LaTeX Error: {math}</span>
    )
  }
}
