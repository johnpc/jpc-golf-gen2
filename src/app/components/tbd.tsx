"use client";
import { View, Heading, Text, useTheme } from "@aws-amplify/ui-react";
import { MatchEntity } from "../data/entities";
import { getDateColor } from "../helpers/getDateColor";

export const Tbd = (props: { match: MatchEntity }) => {
  const { tokens } = useTheme();
  return (
    <View backgroundColor={getDateColor(props.match.date)}>
      <Heading level={1}>
        {props.match.players?.[0]?.name} vs {props.match.players?.[1]?.name}
      </Heading>
      <Text as="span">TBD</Text>
      <Text as="div">on {props.match.date.toLocaleDateString()}</Text>
    </View>
  );
};
