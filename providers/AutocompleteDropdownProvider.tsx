import { useHeaderHeight } from "@react-navigation/elements";
import React, { ReactNode } from "react";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";

// Define the type for the component's props
interface AutocompleteDropdownProviderProps {
  children: ReactNode;
}
export default function AutocompleteDropdownProvider(
  props: AutocompleteDropdownProviderProps
) {
  let headerHeight = useHeaderHeight();
  return (
    <AutocompleteDropdownContextProvider headerOffset={headerHeight}>
      {props.children}
    </AutocompleteDropdownContextProvider>
  );
}
