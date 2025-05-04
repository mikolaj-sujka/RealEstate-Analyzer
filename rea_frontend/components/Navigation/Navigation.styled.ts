// File: components/Navigation.styled.ts
import styled from "@emotion/styled";
import isPropValid from "@emotion/is-prop-valid";

export const Header = styled.header`
  background-color: #040813;
  color: #ffffff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  height: 64px;
`;

// Logo anchor wrapped by Link
export const LogoLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: inherit;
`;

// Navigation container
export const Nav = styled.nav`
  display: none;
  margin-left: 15.5rem;

  @media (min-width: 768px) {
    display: flex;
    gap: 1.5rem;
  }
`;

// Nav item anchor
interface NavLinkProps {
  $active?: boolean;
}

export const NavLink = styled("a", {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== "$active",
})<NavLinkProps>`
  color: ${(props) => (props.$active ? "#ffffff" : "#b0b0b0")};
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: #e0e0e0;
  }
`;

export const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
`;

// Button anchor wrapped by Link
export const ButtonLink = styled.a`
  background-color: var(--secondary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--navbar-button-hover);
  }
`;
