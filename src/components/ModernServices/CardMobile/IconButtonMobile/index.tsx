import { Button } from '@chakra-ui/react';

export default function IconButtonMobile({ ...rest }) {
  return (
    <Button bgColor="transparent" w="auto" h="auto">
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_9798:670)">
          <circle cx="22" cy="22" r="21" fill="#CD3167" />
          <path
            d="M18.75 28.25L21.25 30.75L18.75 33.25"
            stroke="#F8F9FA"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M21.25 30.75C14.3463 30.75 8.75002 27.9519 8.75002 24.5C8.75002 23.6112 9.12127 22.7656 9.79002 22"
            stroke="#F8F9FA"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M26.25 30.23C30.665 29.2656 33.75 27.0625 33.75 24.5C33.75 23.6112 33.3788 22.7656 32.71 22"
            stroke="#F8F9FA"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <mask id="path-5-inside-1_9798:670" fill="white">
            <rect x="15.25" y="9.25" width="13.5" height="15.75" rx="2" />
          </mask>
          <rect
            x="15.25"
            y="9.25"
            width="13.5"
            height="15.75"
            rx="2"
            stroke="#F8F9FA"
            stroke-width="5"
            mask="url(#path-5-inside-1_9798:670)"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_9798:670"
            x="0"
            y="0"
            width="48"
            height="48"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="2" dy="2" />
            <feGaussianBlur stdDeviation="1.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_9798:670"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_9798:670"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </Button>
  );
}
