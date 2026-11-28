import styled from "styled-components";

export const StoreIdentityContainer = styled.section`
  margin: 0;
`;

export const StoreBanner = styled.div`
  display: grid;
  min-height: 88px;
  place-items: center;
  overflow: hidden;
  border-radius: 22px;

  @media (min-width: 761px) {
    min-height: 132px;
    border-radius: 26px;
  }
`;

export const StoreLogo = styled.img`
  display: block;
  width: 242px;
  height: 242px;
  border: 3px solid rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  background: #ffe500;
  object-fit: cover;

  @media (min-width: 761px) {
    width: 100px;
    height: 100px;
  }
`;

export const StoreLogoFallback = styled.div`
  display: grid;
  width: 242px;
  height: 242px;
  place-items: center;
  border: 3px solid rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  background: linear-gradient(145deg, var(--gray-soft), var(--surface));
  color: var(--gray-muted);
  font-size: 54px;
  font-weight: 600;
  letter-spacing: -0.09em;

  @media (min-width: 761px) {
    width: 100px;
    height: 100px;
    font-size: 28px;
  }
`;

export const StoreName = styled.h2`
  text-align: center;
  margin: 12px 2px 0;
  color: var(--brand-gray);
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.25;

  @media (min-width: 761px) {
    margin-top: 18px;
    font-size: 28px;
  }
`;

export const StoreCategory = styled.p`
  text-align: center;
  margin: 2px 2px 0;
  color: var(--gray-muted);
  font-size: 18px;

  @media (min-width: 761px) {
    font-size: 14px;
  }
`;

export const StoreLocation = styled.p`
  margin: 6px 2px 0;
  color: var(--gray-muted);
  font-size: 14px;
  text-align: center;
`;
