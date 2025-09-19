import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export const Card = ({ title, description, onPress, variant = 'default' }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-500 border-blue-600';
      case 'success':
        return 'bg-green-500 border-green-600';
      case 'warning':
        return 'bg-amber-500 border-amber-600';
      default:
        return 'bg-white border-gray-200';
    }
  };

  const getTextColor = () => {
    return variant === 'default' ? 'text-gray-800' : 'text-white';
  };

  return (
    <TouchableOpacity
      className={`rounded-xl p-4 border shadow-sm mb-4 ${getVariantStyles()}`}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text className={`text-lg font-semibold mb-2 ${getTextColor()}`}>
        {title}
      </Text>
      {description && (
        <Text className={`text-sm ${variant === 'default' ? 'text-gray-600' : 'text-white/80'}`}>
          {description}
        </Text>
      )}
    </TouchableOpacity>
  );
};