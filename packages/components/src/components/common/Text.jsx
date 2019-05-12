import styled from "@emotion/native";
import { isMobile } from "../utils/platforms";

export const Text = styled.Text`
  font-family: Inter;
  color: #1d1d1d;
`;

const titleFontSize = isMobile ? "24px" : "32px;";
export const Title = styled(Text)`
  font-size: ${titleFontSize};
  font-weight: 700;
`;

const headingFontSize = isMobile ? "32px" : "36px;";
export const Heading = styled(Title)`
  font-size: ${headingFontSize};
`;
