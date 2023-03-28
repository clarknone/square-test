import { Box, Button, Container, Stack } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";

import * as Square from "@square/web-sdk";

const applicationId = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID || "";

export default function Home() {
  const [payment, setPayment] = useState<Square.Payments>();
  const [card, setCard] = useState<Square.Card>();

  useEffect(() => {
    createPaymentUI();
  }, []);

  function createPaymentUI() {
    Square.payments(applicationId).then((val) => {
      if (val) {
        setPayment(val);
        val.card().then(async (cardVal) => {
          cardVal && setCard(cardVal);
          await cardVal.attach("#card")
        });
      }
    });
  }

  const handleCardPay = () => {
    card?.tokenize().then((result) => {
      console.log({ result });
    });
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth={false} disableGutters>
        <Stack maxWidth={"500px"} mx={"auto"}>
          <Box id="card"> </Box>
          <Button variant="contained" onClick={handleCardPay}>
            Pay
          </Button>
        </Stack>
      </Container>
    </>
  );
}
