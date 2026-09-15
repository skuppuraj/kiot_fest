/**
 * Helper to safely persist and hydrate Redux state via localStorage in Next.js
 */
export const loadState = () => {
  try {
    if (typeof window === 'undefined') {
      return undefined;
    }
    const serializedState = localStorage.getItem('kiot_fest_cart');
    if (!serializedState) {
      return undefined;
    }
    const parsed = JSON.parse(serializedState);
    return {
      cart: {
        items: parsed.items || [],
        totalAmount: parsed.totalAmount || 0,
        studentInfo: parsed.studentInfo || {
          name: '',
          rollNo: '',
          department: 'CSE',
          year: 3,
          college: 'Knowledge Institute of Technology',
          email: '',
          phone: ''
        },
        isCartOpen: false,
        lastGeneratedPass: null
      }
    };
  } catch (err) {
    console.warn('Could not load state from localStorage:', err);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    if (typeof window === 'undefined') return;
    if (!state.cart) return;

    const dataToSave = {
      items: state.cart.items,
      totalAmount: state.cart.totalAmount,
      studentInfo: state.cart.studentInfo,
    };
    localStorage.setItem('kiot_fest_cart', JSON.stringify(dataToSave));
  } catch (err) {
    console.warn('Could not save state to localStorage:', err);
  }
};
