<script setup>
defineProps({
  fill: { default: "", type: String },
  name: { default: "", type: String },
  stroke: { default: "", type: String },
});
</script>

<template>
  <div class="svg">
    <svg
      v-if="name === 'menu-home'"
      viewBox="0 0 20 22"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="20.000000"
      height="22.000000"
      fill="none"
      customFrame="#000000">
      <path
        id="Vector"
        d="M0 19.4857L0 8.17143C0 7.77333 0.0887498 7.39619 0.26625 7.04C0.44375 6.68381 0.688333 6.39047 1 6.16L8.5 0.502857C8.9375 0.167619 9.4375 0 10 0C10.5625 0 11.0625 0.167619 11.5 0.502857L19 6.16C19.3125 6.39047 19.5575 6.68381 19.735 7.04C19.9125 7.39619 20.0008 7.77333 20 8.17143L20 19.4857C20 20.1771 19.755 20.7693 19.265 21.2621C18.775 21.7549 18.1867 22.0008 17.5 22L13.75 22C13.3958 22 13.0992 21.8793 12.86 21.6379C12.6208 21.3966 12.5008 21.0982 12.5 20.7429L12.5 14.4571C12.5 14.1009 12.38 13.8026 12.14 13.5621C11.9 13.3215 11.6033 13.2008 11.25 13.2L8.75 13.2C8.39583 13.2 8.09916 13.3207 7.86 13.5621C7.62083 13.8034 7.50083 14.1018 7.5 14.4571L7.5 20.7429C7.5 21.099 7.38 21.3978 7.14 21.6392C6.9 21.8806 6.60333 22.0008 6.25 22L2.5 22C1.8125 22 1.22417 21.754 0.735 21.2621C0.245833 20.7701 0.000833333 20.178 0 19.4857Z"
        fill="rgb(18,54,84)"
        fill-rule="nonzero" />
    </svg>
    <svg
      v-if="name === 'menu-user'"
      viewBox="0 0 22 18"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="22.000000"
      height="18.000000"
      fill="none"
      customFrame="#000000">
      <path
        id="Vector"
        d="M6.6 0.000564756C5.43305 0.000564756 4.31389 0.474655 3.48873 1.31854C2.66357 2.16243 2.2 3.30699 2.2 4.50042C2.2 5.69386 2.66357 6.83842 3.48873 7.6823C4.31389 8.52619 5.43305 9.00028 6.6 9.00028C7.76695 9.00028 8.88611 8.52619 9.71127 7.6823C10.5364 6.83842 11 5.69386 11 4.50042C11 3.30699 10.5364 2.16243 9.71127 1.31854C8.88611 0.474655 7.76695 0.000564756 6.6 0.000564756ZM4.4 10.1252C3.23305 10.1252 2.11389 10.5993 1.28873 11.4432C0.46357 12.2871 1.46549e-15 13.4317 0 14.6251L0 15.7501C4.88498e-16 16.3468 0.231785 16.9191 0.644365 17.341C1.05695 17.763 1.61652 18 2.2 18L11 18C11.5835 18 12.1431 17.763 12.5556 17.341C12.9682 16.9191 13.2 16.3468 13.2 15.7501L13.2 14.6251C13.2 13.4317 12.7364 12.2871 11.9113 11.4432C11.0861 10.5993 9.96695 10.1252 8.8 10.1252L4.4 10.1252ZM12.375 7.76845C12.9008 6.80098 13.2 5.68726 13.2 4.50042C13.2002 3.35683 12.9164 2.23192 12.375 1.23128C12.9996 0.626866 13.7837 0.222871 14.6303 0.0692202C15.477 -0.0844304 16.3491 0.0189982 17.1389 0.366724C17.9287 0.714449 18.6016 1.29123 19.0744 2.02578C19.5472 2.76033 19.7991 3.62046 19.7991 4.49986C19.7991 5.37926 19.5472 6.23939 19.0744 6.97394C18.6016 7.70849 17.9287 8.28527 17.1389 8.633C16.3491 8.98072 15.477 9.08415 14.6303 8.9305C13.7837 8.77685 12.9996 8.37286 12.375 7.76845ZM14.8126 18C15.1866 17.3385 15.4011 16.5702 15.4011 15.7501L15.4011 14.6251C15.4031 12.9644 14.8045 11.3616 13.7203 10.1252L17.6 10.1252C18.767 10.1252 19.8861 10.5993 20.7113 11.4432C21.5364 12.2871 22 13.4317 22 14.6251L22 15.7501C22 16.3468 21.7682 16.9191 21.3556 17.341C20.9431 17.763 20.3835 18 19.8 18L14.8126 18Z"
        fill="rgb(18,54,84)"
        fill-rule="evenodd" />
    </svg>

    <svg
      v-if="name === 'user'"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-user w-4 h-4 mr-3"
      aria-hidden="true"
      bis_size='{"x":28,"y":681,"w":16,"h":16,"abs_x":269,"abs_y":730}'>
      <path
        d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
        bis_size='{"x":31,"y":691,"w":9,"h":4,"abs_x":272,"abs_y":740}'></path>
      <circle
        cx="12"
        cy="7"
        r="4"
        bis_size='{"x":33,"y":683,"w":5,"h":5,"abs_x":274,"abs_y":732}'></circle>
    </svg>

    <svg
      v-if="name === 'exit'"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-log-out w-4 h-4 mr-3"
      aria-hidden="true"
      bis_size='{"x":28,"y":769,"w":16,"h":16,"abs_x":269,"abs_y":818}'>
      <path
        d="m16 17 5-5-5-5"
        bis_size='{"x":38,"y":773,"w":3,"h":6,"abs_x":279,"abs_y":822}'></path>
      <path
        d="M21 12H9"
        bis_size='{"x":34,"y":777,"w":8,"h":0,"abs_x":275,"abs_y":826}'></path>
      <path
        d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
        bis_size='{"x":30,"y":771,"w":4,"h":12,"abs_x":271,"abs_y":820}'></path>
    </svg>

    <svg
      v-if="name === 'add-user'"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-user-plus w-4 h-4 mr-2"
      aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
      <circle
        cx="9"
        cy="7"
        r="4"></circle>
      <line
        x1="19"
        x2="19"
        y1="8"
        y2="14"></line>
      <line
        x1="22"
        x2="16"
        y1="11"
        y2="11"></line>
    </svg>

    <svg
      v-if="name === 'search'"
      width="21.503113"
      height="21.502930"
      viewBox="0 0 21.5031 21.5029"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink">
      <desc>Created with Pixso.</desc>
      <defs />
      <path
        id="Vector"
        d="M9.57 18.39C4.7 18.39 0.75 14.44 0.75 9.57C0.75 4.7 4.7 0.75 9.57 0.75C14.44 0.75 18.39 4.7 18.39 9.57C18.39 14.44 14.44 18.39 9.57 18.39Z"
        stroke="#000"
        stroke-opacity="1.000000"
        stroke-width="1.500000"
        stroke-linejoin="round" />
      <path
        id="Vector"
        d="M20.75 20.75L15.81 15.81"
        stroke="#000"
        stroke-opacity="1.000000"
        stroke-width="1.500000"
        stroke-linejoin="round"
        stroke-linecap="round" />
    </svg>

    <svg
      v-if="name === 'edit'"
      width="17.500000"
      height="17.500000"
      viewBox="0 0 17.5 17.5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink">
      <desc>Created with Pixso.</desc>
      <defs />
      <path
        id="Vector"
        d="M8.27 16.75L16.27 16.75"
        stroke="#000"
        stroke-opacity="1.000000"
        stroke-width="1.500000"
        stroke-linejoin="round"
        stroke-linecap="round" />
      <path
        id="Vector"
        d="M0.75 16.75L4.51 16.75L13.92 7.33L16.75 4.51L12.98 0.75L10.16 3.57L0.75 12.98L0.75 16.75Z"
        stroke="#000"
        stroke-opacity="1.000000"
        stroke-width="1.500000"
        stroke-linejoin="round" />
      <path
        id="Vector"
        d="M13.92 7.33L10.16 3.57"
        stroke="#000"
        stroke-opacity="1.000000"
        stroke-width="1.500000"
        stroke-linejoin="round"
        stroke-linecap="round" />
    </svg>

    <svg
      v-if="name === 'edit-white'"
      width="17.500000"
      height="17.500000"
      viewBox="0 0 17.5 17.5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink">
      <desc>Created with Pixso.</desc>
      <defs />
      <path
        id="Vector"
        d="M8.27 16.75L16.27 16.75"
        stroke="#fff"
        stroke-opacity="1.000000"
        stroke-width="1.500000"
        stroke-linejoin="round"
        stroke-linecap="round" />
      <path
        id="Vector"
        d="M0.75 16.75L4.51 16.75L13.92 7.33L16.75 4.51L12.98 0.75L10.16 3.57L0.75 12.98L0.75 16.75Z"
        stroke="#fff"
        stroke-opacity="1.000000"
        stroke-width="1.500000"
        stroke-linejoin="round" />
      <path
        id="Vector"
        d="M13.92 7.33L10.16 3.57"
        stroke="#fff"
        stroke-opacity="1.000000"
        stroke-width="1.500000"
        stroke-linejoin="round"
        stroke-linecap="round" />
    </svg>

    <svg
      v-if="name === 'delete'"
      width="16.000000"
      height="16.000000"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink">
      <desc>Created with Pixso.</desc>
      <defs />
      <path
        id="Vector"
        d="M4 1.6C4 1.17 4.16 0.76 4.46 0.46C4.76 0.16 5.17 0 5.59 0L10.4 0C10.82 0 11.23 0.16 11.53 0.46C11.83 0.76 12 1.17 12 1.6L12 3.2L15.2 3.2C15.41 3.2 15.61 3.28 15.76 3.43C15.91 3.58 16 3.78 16 4C16 4.21 15.91 4.41 15.76 4.56C15.61 4.71 15.41 4.79 15.2 4.79L14.34 4.79L13.65 14.51C13.62 14.91 13.44 15.29 13.14 15.57C12.84 15.84 12.45 16 12.05 16L3.94 16C3.53 16 3.14 15.84 2.85 15.57C2.55 15.29 2.37 14.91 2.34 14.51L1.65 4.79L0.79 4.79C0.58 4.79 0.38 4.71 0.23 4.56C0.08 4.41 0 4.21 0 4C0 3.78 0.08 3.58 0.23 3.43C0.38 3.28 0.58 3.2 0.79 3.2L4 3.2L4 1.6ZM5.59 3.2L10.4 3.2L10.4 1.6L5.59 1.6L5.59 3.2ZM3.25 4.79L3.94 14.39L12.05 14.39L12.74 4.79L3.25 4.79ZM6.4 6.39C6.61 6.39 6.81 6.48 6.96 6.63C7.11 6.78 7.2 6.98 7.2 7.2L7.2 12C7.2 12.21 7.11 12.41 6.96 12.56C6.81 12.71 6.61 12.79 6.4 12.79C6.18 12.79 5.98 12.71 5.83 12.56C5.68 12.41 5.59 12.21 5.59 12L5.59 7.2C5.59 6.98 5.68 6.78 5.83 6.63C5.98 6.48 6.18 6.39 6.4 6.39ZM9.59 6.39C9.81 6.39 10.01 6.48 10.16 6.63C10.31 6.78 10.4 6.98 10.4 7.2L10.4 12C10.4 12.21 10.31 12.41 10.16 12.56C10.01 12.71 9.81 12.79 9.59 12.79C9.38 12.79 9.18 12.71 9.03 12.56C8.88 12.41 8.79 12.21 8.79 12L8.79 7.2C8.79 6.98 8.88 6.78 9.03 6.63C9.18 6.48 9.38 6.39 9.59 6.39Z"
        fill="#000"
        fill-opacity="1.000000"
        fill-rule="nonzero" />
    </svg>

    <svg
      v-if="name === 'file-add'"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.99435 0H3.52941C3.09258 0 2.67365 0.173529 2.36477 0.482412C2.05588 0.791296 1.88235 1.21023 1.88235 1.64706V11.5294C1.88235 12.4386 2.62024 13.1765 3.52941 13.1765H6.78306C6.69608 12.8688 6.63779 12.5537 6.60894 12.2353H3.52941C3.3422 12.2353 3.16266 12.1609 3.03028 12.0285C2.8979 11.8962 2.82353 11.7166 2.82353 11.5294V1.64706C2.82353 1.45985 2.8979 1.2803 3.03028 1.14792C3.16266 1.01555 3.3422 0.941176 3.52941 0.941176H7.52941V4.23529C7.52941 4.60972 7.67815 4.96881 7.94291 5.23356C8.20767 5.49832 8.56675 5.64706 8.94118 5.64706H12.2353V6.60894C12.5591 6.63843 12.8728 6.69647 13.1765 6.78306V5.15765C13.1672 4.733 12.9942 4.32837 12.6936 4.02824L9.14824 0.482824C8.84345 0.177779 8.43119 0.0044269 8 0H7.99435ZM8.47059 1.136L8.48282 1.14824L12.0282 4.69365L12.0405 4.70588H8.94118C8.81637 4.70588 8.69667 4.6563 8.60842 4.56805C8.52017 4.4798 8.47059 4.3601 8.47059 4.23529V1.136ZM3.29412 14.1176H7.15294C7.32612 14.4552 7.53224 14.7689 7.77129 15.0588H3.29412C2.42046 15.0588 1.58259 14.7118 0.964825 14.094C0.347058 13.4762 0 12.6384 0 11.7647V10.8235C0 10.6987 0.0495798 10.579 0.137832 10.4908C0.226085 10.4025 0.34578 10.3529 0.470588 10.3529C0.595396 10.3529 0.715092 10.4025 0.803344 10.4908C0.891597 10.579 0.941176 10.6987 0.941176 10.8235V11.7647C0.941176 12.3887 1.18907 12.9872 1.63034 13.4285C2.0716 13.8697 2.67008 14.1176 3.29412 14.1176ZM3.76471 3.29412C3.76471 3.16931 3.81429 3.04961 3.90254 2.96136C3.99079 2.87311 4.11049 2.82353 4.23529 2.82353H6.11765C6.24246 2.82353 6.36215 2.87311 6.4504 2.96136C6.53866 3.04961 6.58824 3.16931 6.58824 3.29412C6.58824 3.41893 6.53866 3.53862 6.4504 3.62687C6.36215 3.71513 6.24246 3.76471 6.11765 3.76471H4.23529C4.11049 3.76471 3.99079 3.71513 3.90254 3.62687C3.81429 3.53862 3.76471 3.41893 3.76471 3.29412ZM4.23529 4.70588C4.11049 4.70588 3.99079 4.75546 3.90254 4.84371C3.81429 4.93197 3.76471 5.05166 3.76471 5.17647C3.76471 5.30128 3.81429 5.42097 3.90254 5.50923C3.99079 5.59748 4.11049 5.64706 4.23529 5.64706H6.11765C6.24246 5.64706 6.36215 5.59748 6.4504 5.50923C6.53866 5.42097 6.58824 5.30128 6.58824 5.17647C6.58824 5.05166 6.53866 4.93197 6.4504 4.84371C6.36215 4.75546 6.24246 4.70588 6.11765 4.70588H4.23529ZM4.23529 6.58824C4.11049 6.58824 3.99079 6.63781 3.90254 6.72607C3.81429 6.81432 3.76471 6.93402 3.76471 7.05882C3.76471 7.18363 3.81429 7.30333 3.90254 7.39158C3.99079 7.47983 4.11049 7.52941 4.23529 7.52941H6.11765C6.24246 7.52941 6.36215 7.47983 6.4504 7.39158C6.53866 7.30333 6.58824 7.18363 6.58824 7.05882C6.58824 6.93402 6.53866 6.81432 6.4504 6.72607C6.36215 6.63781 6.24246 6.58824 6.11765 6.58824H4.23529ZM16 11.7647C16 12.888 15.5538 13.9652 14.7595 14.7595C13.9652 15.5538 12.888 16 11.7647 16C10.6414 16 9.56417 15.5538 8.7699 14.7595C7.97563 13.9652 7.52941 12.888 7.52941 11.7647C7.52941 10.6414 7.97563 9.56417 8.7699 8.7699C9.56417 7.97563 10.6414 7.52941 11.7647 7.52941C12.888 7.52941 13.9652 7.97563 14.7595 8.7699C15.5538 9.56417 16 10.6414 16 11.7647ZM12.2353 9.88235C12.2353 9.75755 12.1857 9.63785 12.0975 9.5496C12.0092 9.46134 11.8895 9.41177 11.7647 9.41177C11.6399 9.41177 11.5202 9.46134 11.4319 9.5496C11.3437 9.63785 11.2941 9.75755 11.2941 9.88235V11.2941H9.88235C9.75755 11.2941 9.63785 11.3437 9.5496 11.4319C9.46134 11.5202 9.41177 11.6399 9.41177 11.7647C9.41177 11.8895 9.46134 12.0092 9.5496 12.0975C9.63785 12.1857 9.75755 12.2353 9.88235 12.2353H11.2941V13.6471C11.2941 13.7719 11.3437 13.8916 11.4319 13.9798C11.5202 14.0681 11.6399 14.1176 11.7647 14.1176C11.8895 14.1176 12.0092 14.0681 12.0975 13.9798C12.1857 13.8916 12.2353 13.7719 12.2353 13.6471V12.2353H13.6471C13.7719 12.2353 13.8916 12.1857 13.9798 12.0975C14.0681 12.0092 14.1176 11.8895 14.1176 11.7647C14.1176 11.6399 14.0681 11.5202 13.9798 11.4319C13.8916 11.3437 13.7719 11.2941 13.6471 11.2941H12.2353V9.88235Z"
        fill="#000" />
    </svg>

    <svg
      v-if="name === 'file-upload'"
      width="13.444458"
      height="17.000000"
      viewBox="0 0 13.4445 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink">
      <desc>Created with Pixso.</desc>
      <defs />
      <path
        id="Vector"
        d="M8.5 0.5L8.5 4.05C8.5 4.29 8.59 4.51 8.76 4.68C8.92 4.85 9.15 4.94 9.38 4.94L12.94 4.94"
        stroke="#FFFFFF"
        stroke-opacity="1.000000"
        stroke-width="1.000000"
        stroke-linejoin="round"
        stroke-linecap="round" />
      <path
        id="Vector"
        d="M2.27 16.5C1.8 16.5 1.35 16.31 1.02 15.97C0.68 15.64 0.5 15.19 0.5 14.72L0.5 2.27C0.5 1.8 0.68 1.35 1.02 1.02C1.35 0.68 1.8 0.5 2.27 0.5L8.5 0.5L12.94 4.94L12.94 14.72C12.94 15.19 12.75 15.64 12.42 15.97C12.09 16.31 11.63 16.5 11.16 16.5L2.27 16.5ZM6.72 7.61L6.72 12.94"
        stroke="#FFFFFF"
        stroke-opacity="1.000000"
        stroke-width="1.000000"
        stroke-linejoin="round"
        stroke-linecap="round" />
      <path
        id="Vector"
        d="M4.5 9.83L6.72 7.61L8.94 9.83"
        stroke="#FFFFFF"
        stroke-opacity="1.000000"
        stroke-width="1.000000"
        stroke-linejoin="round"
        stroke-linecap="round" />
    </svg>

    <svg
      v-if="name === 'add'"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.6491 7.28507H8.37445V0.803574C8.37903 0.592143 8.29972 0.387496 8.15386 0.234373C8.08646 0.159554 8.00389 0.0999573 7.91166 0.0595547C7.81942 0.0191521 7.71963 -0.00112763 7.61894 6.38942e-05C7.51806 -0.00129082 7.41805 0.0189111 7.32561 0.059319C7.23316 0.0997268 7.15041 0.159408 7.08289 0.234373C6.93702 0.387496 6.85771 0.592143 6.8623 0.803574V7.28621H0.755693C0.655003 7.28502 0.555216 7.3053 0.46298 7.3457C0.370744 7.38611 0.288177 7.4457 0.220782 7.52052C0.0749138 7.67365 -0.00439697 7.87829 0.000188309 8.08972C-0.00439697 8.30115 0.0749138 8.5058 0.220782 8.65892C0.288177 8.73374 0.370744 8.79334 0.46298 8.83374C0.555216 8.87414 0.655003 8.89442 0.755693 8.89323H6.8623V15.1964C6.85771 15.4079 6.93702 15.6125 7.08289 15.7656C7.15041 15.8406 7.23316 15.9003 7.32561 15.9407C7.41805 15.9811 7.51806 16.0013 7.61894 15.9999C7.82849 15.9999 8.00679 15.9218 8.15386 15.7656C8.29972 15.6125 8.37903 15.4079 8.37445 15.1964V8.89323H14.6491C14.8594 8.89323 15.0377 8.81513 15.184 8.65892C15.3298 8.5058 15.4092 8.30115 15.4046 8.08972C15.4092 7.87829 15.3298 7.67365 15.184 7.52052C15.1166 7.4457 15.034 7.38611 14.9418 7.3457C14.8495 7.3053 14.7498 7.28388 14.6491 7.28507Z"
        fill="white" />
    </svg>

    <svg
      v-if="name === 'download'"
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13 10V12.25C13 13.0784 12.3284 13.75 11.5 13.75H2.5C1.67157 13.75 1 13.0784 1 12.25V10"
        :stroke="stroke || '#2B8BD1'"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round" />
      <path
        d="M4 7L7 10L10 7"
        :stroke="stroke || '#2B8BD1'"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round" />
      <path
        d="M7 10V1"
        :stroke="stroke || '#2B8BD1'"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round" />
    </svg>

    <svg
      v-if="name === 'file'"
      width="15"
      height="18"
      viewBox="0 0 15 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.66669 9.88867H9.00002"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round" />
      <path
        d="M3.66669 13.4443H10.7778"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round" />
      <path
        d="M13.4444 17H1V1H8.11111H9L13.4444 5.44444V6.33333V17Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round" />
      <path
        d="M8.11108 1V4.55556C8.11108 5.44444 8.99997 6.33333 9.88886 6.33333C10.7778 6.33333 12.7037 6.33333 13.4444 6.33333"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round" />
    </svg>

    <svg
      v-if="name === 'file-black'"
      width="15"
      height="18"
      viewBox="0 0 15 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.66669 9.88867H9.00002"
        stroke="#007bff"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round" />
      <path
        d="M3.66669 13.4443H10.7778"
        stroke="#007bff"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round" />
      <path
        d="M13.4444 17H1V1H8.11111H9L13.4444 5.44444V6.33333V17Z"
        stroke="#007bff"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round" />
      <path
        d="M8.11108 1V4.55556C8.11108 5.44444 8.99997 6.33333 9.88886 6.33333C10.7778 6.33333 12.7037 6.33333 13.4444 6.33333"
        stroke="#007bff"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round" />
    </svg>

    <svg
      v-if="name === 'send-message'"
      height="16"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024">
      <path
        fill="#212121"
        d="m249.6 417.088 319.744 43.072 39.168 310.272L845.12 178.88 249.6 417.088zm-129.024 47.168a32 32 0 0 1-7.68-61.44l777.792-311.04a32 32 0 0 1 41.6 41.6l-310.336 775.68a32 32 0 0 1-61.44-7.808L512 516.992l-391.424-52.736z"></path>
    </svg>

    <svg
      v-if="name === 'send-file'"
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.00008 9.71442H11.5258L10.0515 8.23442L10.8572 7.42871L13.7144 10.2859L10.8572 13.143L10.0515 12.3373L11.5258 10.8573H4.00008V9.71442Z"
        fill="white" />
      <path
        d="M11.4286 6.85715V4.57144C11.429 4.49623 11.4146 4.42168 11.3861 4.35206C11.3577 4.28244 11.3158 4.21912 11.2628 4.16572L7.26285 0.165724C7.20946 0.112763 7.14614 0.0708629 7.07651 0.042426C7.00689 0.0139891 6.93234 -0.000425245 6.85714 9.55102e-06H1.14286C0.839752 9.55102e-06 0.549062 0.120417 0.334735 0.334744C0.120408 0.549072 0 0.839762 0 1.14287V14.8571C0 15.1602 0.120408 15.4509 0.334735 15.6653C0.549062 15.8796 0.839752 16 1.14286 16H10.2857C10.5888 16 10.8795 15.8796 11.0938 15.6653C11.3082 15.4509 11.4286 15.1602 11.4286 14.8571V13.7143H10.2857V14.8571H1.14286V1.14287H5.71428V4.57144C5.71428 4.87454 5.83469 5.16523 6.04902 5.37956C6.26334 5.59388 6.55403 5.71429 6.85714 5.71429H10.2857V6.85715H11.4286ZM6.85714 4.57144V1.37715L10.0514 4.57144H6.85714Z"
        fill="white" />
    </svg>

    <svg
      v-if="name === 'eye'"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-eye h-4 w-4"
      aria-hidden="true">
      <path
        d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
      <circle
        cx="12"
        cy="12"
        r="3"></circle>
    </svg>

    <svg
      v-if="name === 'auth'"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-file-text w-8 h-8 text-primary-foreground"
      aria-hidden="true"
      bis_size='{"x":712,"y":45,"w":32,"h":32,"abs_x":953,"abs_y":94}'>
      <path
        d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
        bis_size='{"x":717,"y":48,"w":21,"h":26,"abs_x":958,"abs_y":97}'></path>
      <path
        d="M14 2v4a2 2 0 0 0 2 2h4"
        bis_size='{"x":731,"y":48,"w":8,"h":8,"abs_x":972,"abs_y":97}'></path>
      <path
        d="M10 9H8"
        bis_size='{"x":723,"y":57,"w":2,"h":0,"abs_x":964,"abs_y":106}'></path>
      <path
        d="M16 13H8"
        bis_size='{"x":723,"y":62,"w":10,"h":0,"abs_x":964,"abs_y":111}'></path>
      <path
        d="M16 17H8"
        bis_size='{"x":723,"y":68,"w":10,"h":0,"abs_x":964,"abs_y":117}'></path>
    </svg>

    <svg
      v-if="name === 'log-in'"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-log-in w-4 h-4 mr-2"
      aria-hidden="true">
      <path d="m10 17 5-5-5-5"></path>
      <path d="M15 12H3"></path>
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
    </svg>

    <svg
      v-if="name === 'users'"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-users w-4 h-4 mr-3"
      aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
      <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
      <circle
        cx="9"
        cy="7"
        r="4"></circle>
    </svg>

    <svg
      v-if="name === 'notification'"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-bell w-4 h-4 mr-3"
      aria-hidden="true"
      bis_size='{"x":28,"y":725,"w":16,"h":16,"abs_x":269,"abs_y":774}'>
      <path
        d="M10.268 21a2 2 0 0 0 3.464 0"
        bis_size='{"x":34,"y":739,"w":2,"h":0,"abs_x":275,"abs_y":788}'></path>
      <path
        d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"
        bis_size='{"x":30,"y":726,"w":11,"h":10,"abs_x":271,"abs_y":775}'></path>
    </svg>

    <svg
      v-if="name === 'lang'"
      fill="#000000"
      width="24px"
      height="24px"
      viewBox="-51.2 -51.2 614.40 614.40"
      xmlns="http://www.w3.org/2000/svg"
      transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)">
      <g
        id="SVGRepo_bgCarrier"
        stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke="#CCCCCC"
        stroke-width="13.312000000000001"></g>
      <g id="SVGRepo_iconCarrier">
        <title>ionicons-v5-l</title>
        <path
          d="M478.33,433.6l-90-218a22,22,0,0,0-40.67,0l-90,218a22,22,0,1,0,40.67,16.79L316.66,406H419.33l18.33,44.39A22,22,0,0,0,458,464a22,22,0,0,0,20.32-30.4ZM334.83,362,368,281.65,401.17,362Z"></path>
        <path
          d="M267.84,342.92a22,22,0,0,0-4.89-30.7c-.2-.15-15-11.13-36.49-34.73,39.65-53.68,62.11-114.75,71.27-143.49H330a22,22,0,0,0,0-44H214V70a22,22,0,0,0-44,0V90H54a22,22,0,0,0,0,44H251.25c-9.52,26.95-27.05,69.5-53.79,108.36-31.41-41.68-43.08-68.65-43.17-68.87a22,22,0,0,0-40.58,17c.58,1.38,14.55,34.23,52.86,83.93.92,1.19,1.83,2.35,2.74,3.51-39.24,44.35-77.74,71.86-93.85,80.74a22,22,0,1,0,21.07,38.63c2.16-1.18,48.6-26.89,101.63-85.59,22.52,24.08,38,35.44,38.93,36.1a22,22,0,0,0,30.75-4.9Z"></path>
      </g>
    </svg>

    <svg
      v-if="name === 'controls'"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-settings w-4 h-4 mr-3"
      aria-hidden="true"
      bis_size='{"x":28,"y":612,"w":16,"h":16,"abs_x":269,"abs_y":661}'>
      <path
        d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"
        bis_size='{"x":30,"y":613,"w":11,"h":13,"abs_x":271,"abs_y":662}'></path>
      <circle
        cx="12"
        cy="12"
        r="3"
        bis_size='{"x":34,"y":618,"w":4,"h":4,"abs_x":275,"abs_y":667}'></circle>
    </svg>

    <svg
      v-if="name === 'actions-dots'"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-ellipsis w-4 h-4"
      aria-hidden="true">
      <circle
        cx="12"
        cy="12"
        r="1"></circle>
      <circle
        cx="19"
        cy="12"
        r="1"></circle>
      <circle
        cx="5"
        cy="12"
        r="1"></circle>
    </svg>

    <svg
      v-if="name === 'clear-filter'"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-funnel h-4 w-4 mr-2"
      aria-hidden="true">
      <path
        d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"></path>
    </svg>

    <svg
      v-if="name === 'approve'"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-circle-check-big h-4 w-4"
      aria-hidden="true">
      <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
      <path d="m9 11 3 3L22 4"></path>
    </svg>

    <svg
      v-if="name === 'reject'"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-circle-x h-4 w-4"
      aria-hidden="true">
      <circle
        cx="12"
        cy="12"
        r="10"></circle>
      <path d="m15 9-6 6"></path>
      <path d="m9 9 6 6"></path>
    </svg>

    <svg
      v-if="name === 'eraser'"
      width="64px"
      height="64px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g
        id="SVGRepo_bgCarrier"
        stroke-width="0" />
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round" />
      <g id="SVGRepo_iconCarrier">
        <path
          d="M5.50506 11.4096L6.03539 11.9399L5.50506 11.4096ZM3 14.9522H2.25H3ZM12.5904 18.4949L12.0601 17.9646L12.5904 18.4949ZM9.04776 21V21.75V21ZM11.4096 5.50506L10.8792 4.97473L11.4096 5.50506ZM13.241 17.8444C13.5339 18.1373 14.0088 18.1373 14.3017 17.8444C14.5946 17.5515 14.5946 17.0766 14.3017 16.7837L13.241 17.8444ZM7.21629 9.69832C6.9234 9.40543 6.44852 9.40543 6.15563 9.69832C5.86274 9.99122 5.86274 10.4661 6.15563 10.759L7.21629 9.69832ZM16.073 16.073C16.3659 15.7801 16.3659 15.3053 16.073 15.0124C15.7801 14.7195 15.3053 14.7195 15.0124 15.0124L16.073 16.073ZM18.4676 11.5559C18.1759 11.8499 18.1777 12.3248 18.4718 12.6165C18.7658 12.9083 19.2407 12.9064 19.5324 12.6124L18.4676 11.5559ZM6.03539 11.9399L11.9399 6.03539L10.8792 4.97473L4.97473 10.8792L6.03539 11.9399ZM6.03539 17.9646C5.18538 17.1146 4.60235 16.5293 4.22253 16.0315C3.85592 15.551 3.75 15.2411 3.75 14.9522H2.25C2.25 15.701 2.56159 16.3274 3.03 16.9414C3.48521 17.538 4.1547 18.2052 4.97473 19.0253L6.03539 17.9646ZM4.97473 10.8792C4.1547 11.6993 3.48521 12.3665 3.03 12.9631C2.56159 13.577 2.25 14.2035 2.25 14.9522H3.75C3.75 14.6633 3.85592 14.3535 4.22253 13.873C4.60235 13.3752 5.18538 12.7899 6.03539 11.9399L4.97473 10.8792ZM12.0601 17.9646C11.2101 18.8146 10.6248 19.3977 10.127 19.7775C9.64651 20.1441 9.33665 20.25 9.04776 20.25V21.75C9.79649 21.75 10.423 21.4384 11.0369 20.97C11.6335 20.5148 12.3008 19.8453 13.1208 19.0253L12.0601 17.9646ZM4.97473 19.0253C5.79476 19.8453 6.46201 20.5148 7.05863 20.97C7.67256 21.4384 8.29902 21.75 9.04776 21.75V20.25C8.75886 20.25 8.449 20.1441 7.9685 19.7775C7.47069 19.3977 6.88541 18.8146 6.03539 17.9646L4.97473 19.0253ZM17.9646 6.03539C18.8146 6.88541 19.3977 7.47069 19.7775 7.9685C20.1441 8.449 20.25 8.75886 20.25 9.04776H21.75C21.75 8.29902 21.4384 7.67256 20.97 7.05863C20.5148 6.46201 19.8453 5.79476 19.0253 4.97473L17.9646 6.03539ZM19.0253 4.97473C18.2052 4.1547 17.538 3.48521 16.9414 3.03C16.3274 2.56159 15.701 2.25 14.9522 2.25V3.75C15.2411 3.75 15.551 3.85592 16.0315 4.22253C16.5293 4.60235 17.1146 5.18538 17.9646 6.03539L19.0253 4.97473ZM11.9399 6.03539C12.7899 5.18538 13.3752 4.60235 13.873 4.22253C14.3535 3.85592 14.6633 3.75 14.9522 3.75V2.25C14.2035 2.25 13.577 2.56159 12.9631 3.03C12.3665 3.48521 11.6993 4.1547 10.8792 4.97473L11.9399 6.03539ZM14.3017 16.7837L7.21629 9.69832L6.15563 10.759L13.241 17.8444L14.3017 16.7837ZM15.0124 15.0124L12.0601 17.9646L13.1208 19.0253L16.073 16.073L15.0124 15.0124ZM19.5324 12.6124C20.1932 11.9464 20.7384 11.3759 21.114 10.8404C21.5023 10.2869 21.75 9.71511 21.75 9.04776H20.25C20.25 9.30755 20.1644 9.58207 19.886 9.979C19.5949 10.394 19.1401 10.8781 18.4676 11.5559L19.5324 12.6124Z"
          fill="#000" />
        <path
          d="M9 21H21"
          stroke="#000"
          stroke-width="1.5"
          stroke-linecap="round" />
      </g>
    </svg>

    <svg
      v-if="name === 'check'"
      width="150px"
      height="150px"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000">
      <g
        id="SVGRepo_bgCarrier"
        stroke-width="0" />

      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round" />

      <g id="SVGRepo_iconCarrier">
        <rect
          x="0"
          fill="none"
          width="20"
          height="20" />
        <g><path d="M15.3 5.3l-6.8 6.8-2.8-2.8-1.4 1.4 4.2 4.2 8.2-8.2" /></g>
      </g>
    </svg>

    <svg
      v-if="name === 'calendar'"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-calendar w-4 h-4"
      aria-hidden="true">
      <path d="M8 2v4"></path>
      <path d="M16 2v4"></path>
      <rect
        width="18"
        height="18"
        x="3"
        y="4"
        rx="2"></rect>
      <path d="M3 10h18"></path>
    </svg>

    <svg
      v-if="name === 'like'"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-heart w-4 h-4 mr-2 fill-current"
      aria-hidden="true">
      <path
        d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
    </svg>
  </div>
</template>

<style lang="scss"></style>
