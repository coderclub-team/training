import { usePostsMutation } from "@/store/api";
import React, { useCallback, useRef, useState } from "react";
import { Dimensions, Platform, Text, View } from "react-native";
import {
  AutocompleteDropdown,
  AutocompleteDropdownContextProvider,
  AutocompleteDropdownItem,
  IAutocompleteDropdownRef,
} from "react-native-autocomplete-dropdown";

function Page() {
  let [fetchPosts, { data: posts, isLoading }] = usePostsMutation();
  const [search, setSearch] = React.useState("");

  const [suggestionsList, setSuggestionsList] = useState<
    AutocompleteDropdownItem[] | null
  >(null);
  const [selectedItem, setSelectedItem] = useState("");
  const dropdownController = useRef<IAutocompleteDropdownRef>(null);

  const searchRef = useRef(null);

  const getSuggestions = useCallback(async (q: string) => {
    const filterToken = q.toLowerCase();
    console.log("getSuggestions", q);
    if (typeof q !== "string" || q.length < 1) {
      setSuggestionsList(null);
      return;
    }

    fetchPosts({ search: q })
      .unwrap()
      .then((data) => {
        let transformedData = data.map((item) => {
          return {
            id: item.place_id,
            title: item.display_name,
          };
        });

        setSuggestionsList(transformedData);
      });
  }, []);

  const onClearPress = useCallback(() => {
    setSuggestionsList(null);
  }, []);

  const onOpenSuggestionsList = useCallback(() => {}, []);

  return (
    <View className="flex justify-center">
      <AutocompleteDropdown
        ref={searchRef}
        // controller={(controller) => {
        //   dropdownController.current = controller;
        // }}
        // initialValue={'1'}
        direction={Platform.select({ ios: "down" })}
        dataSet={suggestionsList}
        onChangeText={getSuggestions}
        onSelectItem={(item) => {
          item && setSelectedItem(item.id);
        }}
        debounce={600}
        suggestionsListMaxHeight={Dimensions.get("window").height * 0.4}
        onClear={onClearPress}
        //  onSubmit={(e) => onSubmitSearch(e.nativeEvent.text)}
        onOpenSuggestionsList={onOpenSuggestionsList}
        loading={isLoading}
        useFilter={false} // set false to prevent rerender twice
        textInputProps={{
          placeholder: "Type 3+ letters (dolo...)",
          autoCorrect: false,
          autoCapitalize: "none",
          style: {
            borderRadius: 25,
            backgroundColor: "#383b42",
            color: "#fff",
            paddingLeft: 18,
          },
        }}
        rightButtonsContainerStyle={{
          right: 8,
          height: 30,

          alignSelf: "center",
        }}
        inputContainerStyle={{
          backgroundColor: "#383b42",
          borderRadius: 25,
        }}
        suggestionsListContainerStyle={{
          backgroundColor: "#383b42",
        }}
        containerStyle={{ flexGrow: 1, flexShrink: 1 }}
        renderItem={(item, text) => (
          <Text style={{ color: "#fff", padding: 15 }}>{item.title}</Text>
        )}
        //   ChevronIconComponent={<Feather name="chevron-down" size={20} color="#fff" />}
        //   ClearIconComponent={<Feather name="x-circle" size={18} color="#fff" />}
        inputHeight={50}
        showChevron={false}
        closeOnBlur={false}
        //  showClear={false}
      />
    </View>
  );
}

export default () => (
  <AutocompleteDropdownContextProvider>
    <Page />
  </AutocompleteDropdownContextProvider>
);
