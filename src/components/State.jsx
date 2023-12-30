import { create } from "zustand";

export const useTaskListFilter = create((set) => ({
  taskFilter: [],
  setTaskFilter: (state) => set(() => ({ taskFilter: state })),
}));
export const usePreviousTasks = create((set) => ({
  previousTasks: [],
  setPreviousTasks: (state) => set(() => ({ previousTasks: state })),
}));
export const useContractFilter = create((set) => ({
  contractFilter: [],
  setContractFilter: (state) => set(() => ({ contractFilter: state })),
}));
export const usePreviousContracts = create((set) => ({
  previousContracts: [],
  setPreviousContracts: (state) => set(() => ({ previousContracts: state })),
}));
export const useAssignedFilter = create((set) => ({
  assignedFilter: [],
  setAssignedFilter: (state) => set(() => ({ assignedFilter: state })),
}));
export const useMessage = create((set) => ({
  message: [],
  setMessage: (state) => set(() => ({ message: state })),
}));