"use client";
import { View, Heading, Text } from "@aws-amplify/ui-react";
import { MatchEntity } from "../data/entities";
import { getDateColor } from "../helpers/getDateColor";

export const Tbd = (props: { match: MatchEntity }) => {
  return (
    <View
      borderRadius={"15px"}
      padding={"25px"}
      backgroundColor={getDateColor(props.match.date)}
    >
      <Heading level={4}>
        {props.match.players?.[0]?.name} vs {props.match.players?.[1]?.name} -
        TBD
      </Heading>
      <Text as="div">on {props.match.date.toLocaleDateString()}</Text>
    </View>
  );
};
