import {create} from 'zustand';
import {CustomKey, IKey} from '../components/keyboard/cutom-key';

type CalculatorStore = {
  currentKey: IKey;
  sendKey: (key: IKey) => void;
};

export const useCalculatorStore = create<CalculatorStore>((set, get) => ({
  currentKey: new CustomKey('', () => ''),
  sendKey: (key: IKey) => set(_ => ({currentKey: key})),
}));
