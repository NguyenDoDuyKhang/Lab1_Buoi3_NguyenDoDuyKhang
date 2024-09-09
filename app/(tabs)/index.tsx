import React, { useEffect, useState } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  Text
} from 'react-native';

// Component chính của ứng dụng
const App = () => {
  const { width, height } = useWindowDimensions();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
    height > width ? 'portrait' : 'landscape'
  );

  const [inputText, setInputText] = useState('');

  const updateOrientation = () => {
    if (height > width) {
      setOrientation('portrait');
    } else {
      setOrientation('landscape');
    }
  };

  useEffect(() => {
    const handleOrientationChange = ({ window }: { window: any }) => {
      if (window.height > window.width) {
        setOrientation('portrait');
      } else {
        setOrientation('landscape');
      }
    };

    handleOrientationChange({ window: { height, width } });

    const subscription = Dimensions.addEventListener('change', handleOrientationChange);

    return () => {
      subscription?.remove?.();
    };
  }, [height, width]);

  const handleSubmit = () => {
    if (inputText.toLowerCase() === 'view') {
      updateOrientation();
    }
    setInputText('');
  };

  const buttonWidth = width / 2 - 30;
  const imageWidth = width * 0.8;
  const imageHeight = orientation === 'portrait' ? imageWidth * 0.6 : (imageWidth * 0.6) / 1.5;

  const statusBarBackgroundColor = isDarkMode ? '#333333' : '#ffffff';
  const statusBarStyle = isDarkMode ? 'light-content' : 'dark-content';

  const textInputColor = '#808080';
  const buttonBackgroundColor = isDarkMode ? '#808080' : '#999999';
  const buttonTextColor = isDarkMode ? '#ffffff' : '#000000';
  const appBackgroundColor = isDarkMode ? '#000000' : '#ffffff';

  const imageSource = isDarkMode
    ? 'https://mega.com.vn/media/news/0106_hinh-nen-may-tinh-full-hd79.jpg'
    : 'https://mega.com.vn/media/news/0106_hinh-nen-may-tinh-full-hd19.jpg';

  return (
    <>
      {/* Tùy chỉnh thanh trạng thái cho Android */}
      {Platform.OS !== 'web' && (
        <StatusBar
          barStyle={statusBarStyle}
          backgroundColor={statusBarBackgroundColor}
          translucent={Platform.OS === 'android'}
        />
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContainer, { backgroundColor: appBackgroundColor }]}
        >
          <View style={[styles.container, { backgroundColor: appBackgroundColor }]}>
            {/* Hình ảnh thay đổi theo chế độ */}
            <Image
              source={{
                uri: imageSource,
              }}
              style={{
                width: imageWidth,
                height: imageHeight,
                marginBottom: 20,
              }}
              resizeMode="contain"
            />
            <View
              style={
                orientation === 'portrait'
                  ? styles.buttonContainerPortrait
                  : styles.buttonContainerLandscape
              }
            >
              <TouchableOpacity
                style={[styles.button, { width: buttonWidth, backgroundColor: buttonBackgroundColor }]}
                onPress={() => setIsDarkMode(false)}
              >
                <Text style={{ color: buttonTextColor }}>Chế độ sáng</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { width: buttonWidth, backgroundColor: buttonBackgroundColor }]}
                onPress={() => setIsDarkMode(true)}
              >
                <Text style={{ color: buttonTextColor }}>Chế độ tối</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              placeholder="Nhập văn bản ở đây"
              placeholderTextColor={textInputColor}
              style={[styles.input, { color: textInputColor }]}
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleSubmit}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainerPortrait: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContainerLandscape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 10,
    width: '100%',
    borderRadius: 5,
  },
});

export default App;
