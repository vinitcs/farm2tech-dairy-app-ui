import React from "react";
import {
     StyleSheet,
     Text,
     View,
     Image,
     TouchableOpacity,
     Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, setSelectedProduct } from "../../../redux/slice/productSlice.js";
import { productDisplayInfoData } from "./ProductDisplayInfoContent.js";
import { colors } from "../../../theme/colors/colors.js";
import { fonts } from "../../../theme/fonts/fonts.js";

const ProductDisplayCard = ({ searchQuery, selectedProduct, title, hideTitle = false }) => {
     const navigation = useNavigation();
     const dispatch = useDispatch();
     const cartItems = useSelector((state) => state.product.cartItems);

     const handleAddToCart = (product) => {
          const existingItem = cartItems.find((item) => item.id === product.id);
          if (existingItem) {
               Alert.alert("Product already added to the cart");
          } else {
               Alert.alert("Product added to the cart");
               dispatch(addToCart(product));
          }
     };

     const handleProductSelect = (product) => {
          dispatch(setSelectedProduct(product));
          navigation.navigate("ProductInfo");
     };

     const filteredData = productDisplayInfoData.filter((item) => {
          if (searchQuery) {
               return item.name.toLowerCase().includes(searchQuery.toLowerCase());
          }
          if (selectedProduct) {
               return item.name === selectedProduct.name;
          }
          // if (popularProductFlag) {
          //      return productDisplayInfoData;
          //      //Replace productDisplayInfoData with item.popular. Assuming 'popular' is a flag in your product data
          // }
          return true; // No filter applied, show all
     });

     return (
          <View style={styles.productContainer}>
               {!hideTitle && (
                    <Text style={styles.dairyDisplayContainerText}>{title}</Text>
               )}

               <View style={styles.boxContainer}>
                    {filteredData.map((item, idx) => (
                         <TouchableOpacity
                              onPress={() => handleProductSelect(item)}
                              key={idx}
                         >
                              <View style={styles.box}>
                                   <Image source={item.uri} style={styles.logo} />
                                   <View>
                                        <Text style={styles.text}>{item.name}</Text>
                                        <Text style={styles.litreText}>{item.litre}L</Text>
                                        <View style={styles.priceSection}>
                                             <Text style={styles.priceText}>
                                                  {"\u20B9"} {item.price}.0
                                             </Text>
                                             <Text style={styles.priceStrikeThroughText}>
                                                  {"\u20B9"} {item.price}.0
                                             </Text>
                                             <Text style={styles.priceOffText}>{item.price}% off</Text>
                                        </View>
                                        <Text style={styles.priceSubscribeText}>
                                             Subscribe to save {item.price}Rs per unit
                                        </Text>
                                   </View>
                                   <TouchableOpacity
                                        style={styles.addIcon}
                                        onPress={() => handleAddToCart(item)}
                                   >
                                        <Icon
                                             name="cart-outline"
                                             type="ionicon"
                                             size={24}
                                             color={colors.lightText}
                                        />
                                   </TouchableOpacity>
                              </View>
                         </TouchableOpacity>
                    ))}
               </View>
          </View>
     );
};

export default ProductDisplayCard;


const styles = StyleSheet.create({
     productContainer: {
          // backgroundColor:'purple',
          flex: 1,
          height: "auto",
     },

     dairyDisplayContainerText: {
          color: colors.lightText,
          fontSize: 16,
          textAlign: "center",
          marginTop: 15,
          fontFamily: fonts.Bold,
     },

     boxContainer: {
          // backgroundColor: 'red',
          width: "100%",
          height: "auto",
          padding: 2,
          flexDirection: "column",
          justifyContent: "space-between",
          rowGap: 16,
          marginTop: 10,
     },

     box: {
          // backgroundColor: 'blue',
          padding: 10,
          borderRadius: 12,
          borderWidth: 0.4,
          borderColor: colors.outline,
          justifyContent: "flex-start",
          width: "100%",
          height: "auto",
          flexDirection: "row",
          gap: 10,
     },

     logo: {
          // backgroundColor: 'yellow',
          resizeMode: "contain",
          width: 90,
          height: 85,
     },
     text: {
          // backgroundColor:'blue',
          fontSize: 16,
          color: colors.text,
          fontFamily: fonts.Semibold,
     },

     litreText: {
          // backgroundColor:'violet',
          fontSize: 14,
          color: colors.lightText,
          fontFamily: fonts.Medium,
     },

     priceSection: {
          flexDirection: "row",
          gap: 6,
          marginTop: 6,
     },

     priceText: {
          // backgroundColor:'magenta',
          fontSize: 18,
          color: colors.black,
          fontFamily: fonts.Semibold,
     },

     priceStrikeThroughText: {
          // backgroundColor:'magenta',
          fontSize: 14,
          color: colors.lightText,
          fontFamily: fonts.Semibold,
          textDecorationLine: "line-through",
     },

     priceOffText: {
          // backgroundColor:'magenta',
          fontSize: 14,
          color: colors.primary,
          fontFamily: fonts.Semibold,
     },

     priceSubscribeText: {
          // backgroundColor:'magenta',
          fontSize: 12,
          color: colors.primary,
          fontFamily: fonts.Semibold,
     },

     addIcon: {
          // backgroundColor: "yellow",
          position: "absolute",
          right: 0,
          borderTopRightRadius: 12,
          zIndex: 3,
          padding: 6,
     },
});


