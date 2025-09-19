import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-blue-500 to-purple-600">
      <ScrollView className="flex-1 px-4 pt-8">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-white text-3xl font-bold text-center mb-2">
            ¡Plataforma de Fidelización! 🎉
          </Text>
          <Text className="text-blue-100 text-lg text-center">
            Tailwind CSS v3.3.0 + NativeWind v2.0.11
          </Text>
        </View>

        {/* Stats Cards */}
        <View className="flex-row justify-between mb-6">
          <View className="bg-white/20 rounded-2xl p-4 flex-1 mr-2 items-center">
            <Text className="text-white text-2xl font-bold">2,450</Text>
            <Text className="text-blue-100 text-sm">Puntos</Text>
          </View>
          <View className="bg-white/20 rounded-2xl p-4 flex-1 ml-2 items-center">
            <Text className="text-white text-2xl font-bold">Gold ⭐</Text>
            <Text className="text-blue-100 text-sm">Nivel</Text>
          </View>
        </View>

        {/* Main Card */}
        <View className="bg-white/15 rounded-3xl p-6 mb-6 border border-white/20">
          <Text className="text-white text-xl font-semibold mb-3 text-center">
            ✨ ¡Versiones Estables Funcionando!
          </Text>
          <Text className="text-blue-100 text-base text-center leading-6">
            Sin errores de Babel o CSS. Tailwind CSS y NativeWind trabajando perfectamente juntos.
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="space-y-4">
          <TouchableOpacity className="bg-white/25 rounded-xl p-4 border border-white/30">
            <Text className="text-white text-lg font-medium text-center">
              🎯 Canjear Puntos
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="bg-white/25 rounded-xl p-4 border border-white/30">
            <Text className="text-white text-lg font-medium text-center">
              📊 Ver Estadísticas
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="bg-white/25 rounded-xl p-4 border border-white/30">
            <Text className="text-white text-lg font-medium text-center">
              🔥 Ofertas Especiales
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="mt-8 mb-4">
          <Text className="text-blue-200 text-sm text-center">
            Construido con React Native + Expo
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}