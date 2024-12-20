import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { colors } from "../../theme/colors/colors.js";
import { fonts } from "../../theme/fonts/fonts.js";
// import { productDataAndQuantity } from "../components/ProductCard/ProductInfoData";
import { Icon } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, setSelectedProduct } from "../../redux/slice/productSlice.js";
import { useNavigation } from "@react-navigation/native";

const Cart = () => {
  const navigation = useNavigation();
  const cartItems = useSelector((state) => state.product.cartItems);

  const dispatch = useDispatch();

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleProductSelect = (product) => {
    dispatch(setSelectedProduct(product));
    navigation.navigate("ProductInfo");
  }


  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.cartContainer}>
        {cartItems.length !== 0 ?
          cartItems.map((item, index) => (
            <TouchableOpacity
              style={styles.box}
              key={index}
              onPress={() => {
                handleProductSelect(item);
              }}
            >
              <View>
                <Image source={item.uri} style={styles.logo} />
              </View>
              <View
              // style={{backgroundColor:'pink'}}
              >
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.priceText}>
                  {"\u20B9"} {item.price}
                </Text>

                <View style={{ flexDirection: "row", gap: 6, marginTop: 6 }}>
                  <Text style={styles.litreText}>{item.litre}L</Text>
                  {/* <Text style={styles.QuantityText}>QTY: {item.qty}</Text> */}
                </View>
              </View>

              <View style={styles.actionBtnSection}>
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => {
                    handleRemoveFromCart(item.id);
                  }}
                >
                  <Icon
                    name="close-outline"
                    type="ionicon"
                    color={colors.lightText}
                    size={26}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
          :
          <Text style={styles.emptyCartDisplayMsg}>Looks like your cart is empty. Explore our products to fill it up!</Text>
        }
      </View>
    </ScrollView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },

  cartContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingVertical: 15,
    height: "100%",
    gap: 15,
  },

  box: {
    // backgroundColor: colors.lightText,
    padding: 10,
    borderRadius: 12,
    borderWidth: 0.4,
    borderColor: colors.outline,
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: 10,
    position: "relative",
  },

  logo: {
    // backgroundColor: 'yellow',
    resizeMode: "contain",
    width: 90,
    height: 90,
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

  QuantityText: {
    // backgroundColor:'violet',
    fontSize: 14,
    color: colors.lightText,
    fontFamily: fonts.Medium,
  },

  priceText: {
    // backgroundColor:'magenta',
    fontSize: 18,
    color: colors.black,
    fontFamily: fonts.Semibold,
    marginTop: 4,
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

  actionBtnSection: {
    padding: 4,
    borderRadius: 12,
    position: "absolute",
    right: 4,
    top: 4,
    flexDirection: "row",
    gap: 12,
  },

  closeBtn: {
    // backgroundColor: "yellow",
    position: "absolute",
    right: 0,
    borderTopRightRadius: 12,
    zIndex: 3,
    padding: 6,
  },
  emptyCartDisplayMsg: {
    fontSize: 12,
    textAlign: "center",
    margin: "auto",
    color: colors.lightText
  }
});
