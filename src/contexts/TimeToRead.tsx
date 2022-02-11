import { UseDisclosureReturn, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface SidebarDrawerContextProps {
  children: ReactNode;
}

const TimeReadContext = createContext({});

export function SidebarDrawerProvider({ children }: SidebarDrawerContextProps) {
  const [timeRead, setTimeRead] = useState(0);

  return (
    <TimeReadContext.Provider value={timeRead}>
      {children}
    </TimeReadContext.Provider>
  );
}

export const useSidebarDrawer = () => useContext(TimeReadContext);
