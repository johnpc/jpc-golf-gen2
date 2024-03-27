import { Theme } from "@aws-amplify/ui-react";

export const tableTheme: Theme = {
  name: "table-theme",
  tokens: {
    components: {
      table: {
        row: {
          hover: {
            backgroundColor: { value: "{colors.blue.20}" },
          },

          striped: {
            backgroundColor: { value: "{colors.blue.10}" },
          },
        },

        header: {
          color: { value: "{colors.blue.80}" },
          fontSize: { value: "{fontSizes.xl}" },
        },

        data: {
          fontWeight: { value: "{fontWeights.semibold}" },
        },
      },
    },
  },
};
