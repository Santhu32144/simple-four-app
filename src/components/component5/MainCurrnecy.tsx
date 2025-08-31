import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';
import { currencyByRupee } from '../../constants/Currency';

type CurrencySelectorProps = {
  selectedCurrency: string;
  onCurrencySelect: (currency: typeof currencyByRupee[number]) => void;
  title: string;
};

type SwapButtonProps = {
  onPress: () => void;
};

// --- Components ---
const CurrencySelector = ({
  selectedCurrency,
  onCurrencySelect,
  title,
}: CurrencySelectorProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height] = useState(new Animated.Value(0));
  const selectedCurrencyData = currencyByRupee.find(
    c => c.name === selectedCurrency,
  );

  useEffect(() => {
    Animated.timing(height, {
      toValue: isExpanded ? 200 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [height, isExpanded]);

  return (
    <View style={styles.selectorContainer}>
      <Text style={styles.selectorTitle}>{title}</Text>
      <TouchableOpacity
        style={styles.selectorButton}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <View style={styles.selectedCurrencyDisplay}>
          <Text style={styles.selectedFlag}>{selectedCurrencyData?.flag}</Text>
          <View style={styles.selectedCurrencyText}>
            <Text style={styles.selectedCurrencyName}>
              {selectedCurrencyData?.name}
            </Text>
            <Text style={styles.selectedCurrencyFullName}>
              {selectedCurrencyData?.fullName}
            </Text>
          </View>
          <Text style={styles.selectedCurrencySymbol}>
            {selectedCurrencyData?.symbol}
          </Text>
          <Text style={styles.dropdownArrow}>{isExpanded ? '▲' : '▼'}</Text>
        </View>
      </TouchableOpacity>

      {isExpanded && (
        <Animated.View style={[styles.dropdownContainer, { height: height }]}>
          <FlatList
            data={currencyByRupee.filter(c => c.name !== selectedCurrency)}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  onCurrencySelect(item);
                  setIsExpanded(false);
                }}
              >
                <Text style={styles.dropdownFlag}>{item.flag}</Text>
                <View style={styles.dropdownTextContainer}>
                  <Text style={styles.dropdownCurrencyName}>{item.name}</Text>
                  <Text style={styles.dropdownCurrencyFullName}>
                    {item.fullName}
                  </Text>
                </View>
                <Text style={styles.dropdownCurrencySymbol}>{item.symbol}</Text>
              </TouchableOpacity>
            )}
            style={styles.dropdownList}
          />
        </Animated.View>
      )}
    </View>
  );
};

const SwapButton = ({ onPress }: SwapButtonProps) => (
  <TouchableOpacity style={styles.swapButton} onPress={onPress}>
    <Text style={styles.swapIcon}>⇅</Text>
  </TouchableOpacity>
);

// --- Main Component ---
const MultiCurrencyConverter = () => {
  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  const [fromCurrency, setFromCurrency] = useState('KRW');
  const [toCurrency, setToCurrency] = useState('USD');
  const [error, setError] = useState('');

  const fromCurrencyData = currencyByRupee.find(c => c.name === fromCurrency);
  const toCurrencyData = currencyByRupee.find(c => c.name === toCurrency);

  const convertCurrency = (
    amount: number,
    from: Currency,
    to: Currency,
  ): number => {
    const amountInUSD = amount / from.valueInUSD;
    return amountInUSD * to.valueInUSD;
  };

  const handleConversion = React.useCallback(() => {
    if (!inputValue.trim()) {
      setError('Please enter an amount');
      setResultValue('');
      return;
    }
    const inputAmount = parseFloat(inputValue);
    if (isNaN(inputAmount) || inputAmount <= 0) {
      setError('Enter a valid positive number');
      setResultValue('');
      return;
    }
    if (!fromCurrencyData || !toCurrencyData) {
      setError('Currency data unavailable');
      setResultValue('');
      return;
    }
    if (fromCurrency === toCurrency) {
      setResultValue(`${toCurrencyData.symbol} ${inputAmount.toFixed(2)}`);
      setError('');
      return;
    }
    setError('');
    const convertedValue = convertCurrency(
      inputAmount,
      fromCurrencyData,
      toCurrencyData,
    );
    setResultValue(`${toCurrencyData.symbol} ${convertedValue.toFixed(2)}`);
  }, [inputValue, fromCurrencyData, toCurrencyData, fromCurrency, toCurrency]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    if (inputValue && resultValue) handleConversion();
  };

  const clearAll = () => {
    setInputValue('');
    setResultValue('');
    setError('');
  };

  useEffect(() => {
    if (inputValue && !error) handleConversion();
  }, [error, fromCurrency, handleConversion, inputValue, toCurrency]);

  // Data for FlatList
  const renderData = [
    {
      id: 'header',
      render: () => (
        <View style={styles.header}>
          <Text style={styles.title}>Currency Converter</Text>
          <Text style={styles.subtitle}>Convert between any currencies</Text>
        </View>
      ),
    },
    {
      id: 'inputSection',
      render: () => (
        <View style={styles.inputSection}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputPrefix}>{fromCurrencyData?.symbol}</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder={`Enter amount in ${fromCurrency}`}
              placeholderTextColor="#A3BFFA"
              value={inputValue}
              onChangeText={text => {
                let sanitized = text.replace(/[^0-9.]/g, '');
                const parts = sanitized.split('.');
                if (parts.length > 2) {
                  sanitized = `${parts[0]}.${parts[1]}`;
                }
                if (
                  parts[0].startsWith('0') &&
                  parts[0].length > 1 &&
                  !sanitized.includes('.')
                ) {
                  sanitized = parts[0].replace(/^0+/, '') || '0';
                }
                if (sanitized === '.') sanitized = '0.';
                setInputValue(sanitized);
                setError('');
              }}
            />
            {inputValue ? (
              <TouchableOpacity
                style={styles.clearInputButton}
                onPress={() => setInputValue('')}
              >
                <Text style={styles.clearInputText}>✕</Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <TouchableOpacity
            style={[
              styles.convertButton,
              (!inputValue || error) && styles.convertButtonDisabled,
            ]}
            onPress={handleConversion}
            disabled={!inputValue || !!error}
          >
            <Text style={styles.convertButtonText}>Convert</Text>
          </TouchableOpacity>
        </View>
      ),
    },
    {
      id: 'error',
      render: () => (error ? <Text style={styles.errorText}>{error}</Text> : null),
    },
    {
      id: 'currencySelectors',
      render: () => (
        <View style={styles.currencySelectorsContainer}>
          <CurrencySelector
            selectedCurrency={fromCurrency}
            onCurrencySelect={currency => setFromCurrency(currency.name)}
            title="From"
          />
          <SwapButton onPress={swapCurrencies} />
          <CurrencySelector
            selectedCurrency={toCurrency}
            onCurrencySelect={currency => setToCurrency(currency.name)}
            title="To"
          />
        </View>
      ),
    },
    {
      id: 'result',
      render: () =>
        resultValue ? (
          <View style={styles.resultSection}>
            <View style={styles.resultCard}>
              <Text style={styles.resultText}>{resultValue}</Text>
              <Text style={styles.resultCurrency}>
                {toCurrencyData?.fullName}
              </Text>
            </View>
          </View>
        ) : null,
    },
    {
      id: 'clearButton',
      render: () =>
        (inputValue || resultValue) ? (
          <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        ) : null,
    },
  ];

  return (
    <FlatList
      data={renderData}
      renderItem={({ item }) => item.render()}
      keyExtractor={item => item.id}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A252F', padding: 16 },
  header: { alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 32, color: '#E0E7FF', fontWeight: '700' },
  subtitle: { fontSize: 16, color: '#A3BFFA', marginTop: 8 },
  inputSection: { marginBottom: 24 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D3A4B',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputPrefix: { color: '#E0E7FF', fontSize: 20, marginRight: 12 },
  input: { flex: 1, color: '#E0E7FF', fontSize: 18 },
  clearInputButton: { padding: 8 },
  clearInputText: { color: '#A3BFFA', fontSize: 16 },
  convertButton: {
    backgroundColor: '#4C6EF5',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#4C6EF5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  convertButtonDisabled: { backgroundColor: '#3B4A64', elevation: 0 },
  convertButtonText: { color: '#E0E7FF', fontSize: 18, fontWeight: '600' },
  errorText: { color: '#F87171', textAlign: 'center', marginBottom: 16 },
  currencySelectorsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  selectorContainer: { flex: 1, marginHorizontal: 8, alignContent: 'center', justifyContent: 'center' },
  selectorTitle: {
    color: '#A3BFFA',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
  selectorButton: {
    backgroundColor: '#2D3A4B',
    borderRadius: 10,
    padding: 12,
    elevation: 2,
  },
  selectedCurrencyDisplay: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  selectedFlag: { fontSize: 22, marginRight: 10 },
  selectedCurrencyText: { flex: 1, alignItems: 'center' },
  selectedCurrencyName: { color: '#E0E7FF', fontSize: 16, textAlign: 'center' },
  selectedCurrencyFullName: { color: '#A3BFFA', fontSize: 12, textAlign: 'center' },
  selectedCurrencySymbol: { color: '#4C6EF5', fontSize: 18, marginRight: 8 },
  dropdownArrow: { color: '#A3BFFA', fontSize: 14 },
  dropdownContainer: {
    backgroundColor: '#2D3A4B',
    borderRadius: 8,
    marginTop: 4,
    overflow: 'hidden',
  },
  dropdownList: {
    maxHeight: 200,
  },
  dropdownItem: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  dropdownFlag: { fontSize: 18, marginRight: 10 },
  dropdownTextContainer: { flex: 1 },
  dropdownCurrencyName: { color: '#E0E7FF', fontSize: 14 },
  dropdownCurrencyFullName: { color: '#A3BFFA', fontSize: 10 },
  dropdownCurrencySymbol: { color: '#4C6EF5', fontSize: 14 },
  swapButton: {
    backgroundColor: '#3B4A64',
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    borderWidth: 2,
    borderColor: '#4C6EF5',
    marginTop: 20,
  },
  swapIcon: { color: '#4C6EF5', fontSize: 20 },
  resultSection: { marginBottom: 24 },
  resultCard: {
    backgroundColor: '#2D3A4B',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 4,
    borderWidth: 1,
    borderColor: '#4C6EF5',
  },
  resultText: { color: '#10B981', fontSize: 24, fontWeight: '600' },
  resultCurrency: { color: '#A3BFFA', fontSize: 14, marginTop: 4 },
  clearButton: {
    backgroundColor: '#F87171',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 4,
  },
  clearButtonText: { color: '#E0E7FF', fontSize: 16, fontWeight: '500' },
});

export default MultiCurrencyConverter;