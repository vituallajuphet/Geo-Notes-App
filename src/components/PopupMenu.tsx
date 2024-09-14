import { Text } from 'react-native'
import React from 'react'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTailwind } from 'tailwind-rn';

type PopupMenuProps = {
  onLogout: () => void
}

const PopupMenu = ({ onLogout }: PopupMenuProps) => {
  const tw = useTailwind();
  return (
    <Menu>
      <MenuTrigger>
        <Icon name="bars" size={25} style={tw('text-slate-600 dark:text-white')} />
      </MenuTrigger>
      <MenuOptions
        style={tw('bg-white dark:bg-slate-500 p-2')}
      >
        <MenuOption onSelect={() => {
          onLogout();
        }} >
          <Text style={tw('text-base font-bold')}>Logout Account</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  )
}

export default PopupMenu