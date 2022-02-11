import { List, ListItem } from '@chakra-ui/react';
import { ActiveLink } from '../../ActiveLink/index';

interface NavigationItemProps {
  label: string;
  href?: string;
}

export default function NavigationItem({ label, href }: NavigationItemProps) {
  return (
    <List mt="-0.2rem" as="ul">
      <ActiveLink href={href}>
        <ListItem
          cursor="pointer"
          fontSize={['15px', '15px', '15px', '15px', '16px']}
          as="li"
          color="#fff"
          fontWeight="normal"
          textDecoration="none"
          _hover={{
            color: 'pink.300',
          }}
          transition=" linear 20ms"
        >
          {label}
        </ListItem>
      </ActiveLink>
    </List>
  );
}
