"use client";
import {
  Card,
  View,
  Heading,
  Flex,
  Text,
  useTheme,
  Link,
} from "@aws-amplify/ui-react";
import { Capacitor } from "@capacitor/core";
export const Header = () => {
  const { tokens } = useTheme();
  return (
    <View
      backgroundColor={tokens.colors.background.secondary}
      padding={tokens.space.medium}
      width={"100%"}
      textAlign={"center"}
    >
      <Card>
        <Flex direction="row" alignItems="flex-start">
          <Flex
            direction="column"
            alignItems="flex-start"
            gap={tokens.space.xs}
          >
            <Heading level={1}>golf.jpc.io</Heading>
            <Text as="span">
              Ann Arbor golf league.{" "}
              {Capacitor.getPlatform() === "web" ? (
                <Link href="https://testflight.apple.com/join/v4zXk3Ww">
                  Try the iOS app.
                </Link>
              ) : null}
            </Text>
          </Flex>
        </Flex>
      </Card>
    </View>
  );
};
