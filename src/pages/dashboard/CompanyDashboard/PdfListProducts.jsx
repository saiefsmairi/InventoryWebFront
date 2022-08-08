import React from "react";
import { Page, Text, Image, Document, StyleSheet, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 24,
        textAlign: "center",
    },
    text: {
        margin: 12,
        fontSize: 14,

        fontFamily: "Times-Roman",
    },
    text2: {
        margin: 12,
        fontSize: 8,
        textAlign: "justify",
        fontFamily: "Times-Roman",
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "grey",
    },
    pageNumber: {
        position: "absolute",
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "grey",
    },
    row: {
        flexDirection: 'row',
        borderBottomColor: '#3778C2',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
    },
});

const PdfListProducts = ({ prods }) => {
    console.log(prods)
    return (
        <Document>
            <Page style={styles.body}>
                <Text style={styles.header} fixed></Text>
                <Text style={styles.text}>
                    Products List
                </Text>

                {prods.map((prod, index) => (
                    <View style={styles.row} >

                        <Text style={styles.text}>
                            <Text style={styles.text2}>
                                BarCode
                            </Text>
                            {prod.code}
                        </Text>

                        <Text style={styles.text}>
                            <Text style={styles.text2}>
                                Name
                            </Text> {prod.name}
                        </Text>

                        <Text style={styles.text}>
                            <Text style={styles.text2}>
                                Price
                            </Text>   {prod.price} DT
                        </Text>

                        <Text style={styles.text}>
                            <Text style={styles.text2}>
                                Quantity
                            </Text>  {prod.quantity}
                        </Text>

                        <Text style={styles.text}>
                            <Text style={styles.text2}>
                                Zone Name
                            </Text> {prod.zone.name}
                        </Text>
                    </View>
                ))}
                <Text
                    style={styles.pageNumber}
                    render={({ pageNumber, totalPages }) =>
                        `${pageNumber} / ${totalPages}`
                    }
                />
            </Page>
        </Document>
    );
};

export default PdfListProducts;