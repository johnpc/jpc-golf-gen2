"use client";
import {
  Card,
  Image,
  View,
  Heading,
  Flex,
  Text,
  Button,
  useTheme,
} from "@aws-amplify/ui-react";

export const Footer = () => {
  const { tokens } = useTheme();
  return (
    <View
      backgroundColor={tokens.colors.background.secondary}
      padding={tokens.space.medium}
    >
      <Card>
        <Flex
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          alignContent="flex-end"
        >
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="flex-end"
            alignContent="flex-end"
            gap={tokens.space.xs}
          >
            <Flex
              as="span"
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              alignContent="flex-end"
              gap={tokens.space.xs}
            >
              <Text as="span">golf.jpc.io is open source.</Text>
              <Button as="a" href="https://github.com/johnpc/jpc-golf-gen2">
                <Image alt="github" src="/github.png" />
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </View>
  );
};
