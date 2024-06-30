const Recipe = ({
  color = "#F8B02E",
  className,
  fill = false,
}: {
  color?: string;
  className?: string;
  fill?: boolean;
}) => {
  return (
    <svg
      viewBox="0 0 361 164"
      fill={fill ? color : "none"}
      stroke={color}
      preserveAspectRatio={"xMidYMid slice"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Recipe">
        <path
          d="M118.852 80.168C119.961 80.168 120.815 80.6799 121.412 81.7039C122.095 82.728 122.436 84.1359 122.436 85.9279C122.436 89.256 121.625 91.9013 120.004 93.864C115.908 98.8133 111.769 102.653 107.588 105.384C103.407 108.029 98.4573 109.352 92.74 109.352C87.1933 109.352 82.4573 107.859 78.532 104.872C74.692 101.885 71.0227 96.7653 67.524 89.5119C64.708 83.7093 62.4893 79.4426 60.868 76.712C59.2467 73.896 57.6253 71.8906 56.004 70.696C54.468 69.5013 52.548 68.7759 50.244 68.52C49.9027 70.312 48.9213 75.944 47.3 85.416C46.6173 89.6826 46.1907 92.2853 46.02 93.224C45.1667 98.4293 43.46 102.44 40.9 105.256C38.34 107.987 34.4573 109.352 29.252 109.352C23.5347 109.352 18.4573 107.688 14.02 104.36C9.668 100.947 6.29734 96.2533 3.90801 90.28C1.51867 84.2213 0.324005 77.352 0.324005 69.672C0.324005 55.3359 2.79867 42.9626 7.74801 32.5519C12.7827 22.1413 19.78 14.2053 28.74 8.74395C37.7853 3.19728 48.196 0.42395 59.972 0.42395C68.164 0.42395 75.0333 1.66128 80.58 4.13595C86.1267 6.61061 90.2227 10.0239 92.868 14.3759C95.5987 18.7279 96.964 23.6346 96.964 29.0959C96.964 33.8746 95.812 38.5679 93.508 43.1759C91.2893 47.6986 87.9187 51.7093 83.396 55.208C78.8733 58.7066 73.3693 61.3093 66.884 63.0159C70.98 64.1253 74.1373 65.9173 76.356 68.392C78.5747 70.8666 80.7933 74.4933 83.012 79.2719C85.4013 84.392 87.748 88.1466 90.052 90.5359C92.4413 92.9253 95.172 94.1199 98.244 94.1199C100.975 94.1199 103.577 93.224 106.052 91.432C108.527 89.5546 111.641 86.3973 115.396 81.96C116.42 80.7653 117.572 80.168 118.852 80.168ZM32.58 68.392C29.6787 68.392 27.6733 67.7093 26.564 66.3439C25.54 64.9786 25.028 63.4426 25.028 61.736C25.028 59.688 25.668 58.0666 26.948 56.8719C28.3133 55.6773 29.8493 55.0799 31.556 55.0799H34.756C36.1213 46.7173 37.4013 39.5066 38.596 33.448C39.7053 27.9013 43.2893 25.1279 49.348 25.1279C54.212 25.1279 56.644 27.3039 56.644 31.6559C56.644 32.5946 56.6013 33.32 56.516 33.8319L52.676 55.0799C57.284 54.8239 61.4653 53.7146 65.22 51.7519C69.06 49.7893 72.0893 47.0586 74.308 43.56C76.612 40.0613 77.764 36.0933 77.764 31.6559C77.764 26.2799 75.9293 22.0559 72.26 18.9839C68.5907 15.9119 63.2147 14.3759 56.132 14.3759C47.7693 14.3759 40.4307 16.4666 34.116 20.6479C27.8867 24.7439 23.0227 30.8879 19.524 39.0799C16.0253 47.1866 14.276 57.0853 14.276 68.776C14.276 74.2373 14.8307 78.9306 15.94 82.8559C17.0493 86.7813 18.4147 89.7253 20.036 91.688C21.6573 93.6506 23.1933 94.632 24.644 94.632C25.7533 94.632 26.6493 94.0773 27.332 92.9679C28.1 91.8586 28.6973 90.0666 29.124 87.5919L32.58 68.392Z"
          className={className}
        />
        <path
          d="M177.732 76.456C178.841 76.456 179.695 76.968 180.292 77.992C180.975 79.016 181.316 80.424 181.316 82.216C181.316 85.6293 180.505 88.2747 178.884 90.152C175.727 93.992 171.247 97.5333 165.444 100.776C159.727 104.019 153.583 105.64 147.012 105.64C138.052 105.64 131.097 103.208 126.148 98.344C121.199 93.48 118.724 86.824 118.724 78.376C118.724 72.488 119.961 67.0267 122.436 61.992C124.911 56.872 128.324 52.8187 132.676 49.832C137.113 46.8453 142.105 45.352 147.652 45.352C152.601 45.352 156.569 46.8453 159.556 49.832C162.543 52.7333 164.036 56.7013 164.036 61.736C164.036 67.624 161.903 72.7013 157.636 76.968C153.455 81.1493 146.329 84.4773 136.26 86.952C138.393 90.8773 142.447 92.84 148.42 92.84C152.26 92.84 156.612 91.5173 161.476 88.872C166.425 86.1413 170.692 82.6 174.276 78.248C175.3 77.0533 176.452 76.456 177.732 76.456ZM145.476 57.896C142.319 57.896 139.631 59.7307 137.412 63.4C135.279 67.0693 134.212 71.5067 134.212 76.712V76.968C139.247 75.7733 143.215 73.9813 146.116 71.592C149.017 69.2027 150.468 66.4293 150.468 63.272C150.468 61.6507 149.999 60.3707 149.06 59.432C148.207 58.408 147.012 57.896 145.476 57.896Z"
          className={className}
        />
        <path
          d="M195.342 105.64C186.979 105.64 180.451 103.293 175.758 98.6C171.15 93.8213 168.846 87.5493 168.846 79.784C168.846 72.872 170.211 66.8133 172.942 61.608C175.673 56.4027 179.214 52.392 183.566 49.576C187.918 46.76 192.483 45.352 197.262 45.352C201.955 45.352 205.582 46.76 208.142 49.576C210.787 52.3067 212.11 55.848 212.11 60.2C212.11 63.784 211.299 66.8133 209.678 69.288C208.142 71.7627 206.094 73 203.534 73C201.913 73 200.59 72.616 199.566 71.848C198.627 71.08 198.158 70.0133 198.158 68.648C198.158 68.0507 198.243 67.368 198.414 66.6C198.585 65.832 198.713 65.2773 198.798 64.936C199.225 63.656 199.438 62.4613 199.438 61.352C199.438 60.2427 199.139 59.3893 198.542 58.792C198.03 58.1947 197.262 57.896 196.238 57.896C194.275 57.896 192.441 58.792 190.734 60.584C189.027 62.2907 187.662 64.6373 186.638 67.624C185.614 70.6107 185.102 73.896 185.102 77.48C185.102 87.3787 189.411 92.328 198.03 92.328C201.529 92.328 205.283 91.176 209.294 88.872C213.39 86.4827 217.401 82.9413 221.326 78.248C222.35 77.0533 223.502 76.456 224.782 76.456C225.891 76.456 226.745 76.968 227.342 77.992C228.025 79.016 228.366 80.424 228.366 82.216C228.366 85.4587 227.555 88.104 225.934 90.152C221.923 95.1013 217.102 98.9413 211.47 101.672C205.923 104.317 200.547 105.64 195.342 105.64Z"
          className={className}
        />
        <path
          d="M234.787 36.904C231.203 36.904 228.515 36.0933 226.723 34.472C224.931 32.7653 224.035 30.4187 224.035 27.432C224.035 24.4453 225.187 21.9707 227.491 20.008C229.88 17.96 232.824 16.936 236.323 16.936C239.48 16.936 242.04 17.704 244.003 19.24C245.966 20.776 246.947 22.952 246.947 25.768C246.947 29.1813 245.838 31.912 243.619 33.96C241.4 35.9227 238.456 36.904 234.787 36.904ZM233.763 105.64C228.216 105.64 224.163 103.677 221.603 99.752C219.128 95.8267 217.891 90.6213 217.891 84.136C217.891 80.296 218.36 75.3893 219.299 69.416C220.323 63.3573 221.603 57.7253 223.139 52.52C223.907 49.7893 224.931 47.912 226.211 46.888C227.491 45.864 229.539 45.352 232.355 45.352C236.707 45.352 238.883 46.8027 238.883 49.704C238.883 51.8373 238.072 56.7867 236.451 64.552C234.403 73.9387 233.379 80.296 233.379 83.624C233.379 86.184 233.72 88.1467 234.403 89.512C235.086 90.8773 236.238 91.56 237.859 91.56C239.395 91.56 241.315 90.4933 243.619 88.36C245.923 86.2267 248.995 82.856 252.835 78.248C253.859 77.0533 255.011 76.456 256.291 76.456C257.4 76.456 258.254 76.968 258.851 77.992C259.534 79.016 259.875 80.424 259.875 82.216C259.875 85.6293 259.064 88.2747 257.443 90.152C248.995 100.477 241.102 105.64 233.763 105.64Z"
          className={className}
        />
        <path
          d="M317.871 76.456C318.98 76.456 319.834 76.968 320.431 77.992C321.114 79.016 321.455 80.424 321.455 82.216C321.455 85.6293 320.644 88.2747 319.023 90.152C315.354 94.6747 311.386 98.3867 307.119 101.288C302.938 104.189 298.159 105.64 292.783 105.64C288.26 105.64 284.591 104.019 281.775 100.776C276.911 103.933 271.834 105.555 266.543 105.64C265.434 122.109 262.916 135.848 258.991 146.856C255.066 157.949 249.306 163.496 241.711 163.496C237.103 163.496 233.69 161.832 231.471 158.504C229.252 155.176 228.143 150.568 228.143 144.68C228.143 136.317 230.063 126.547 233.903 115.368C237.743 104.275 243.674 92.0293 251.695 78.632C251.695 66.1733 251.61 57.512 251.439 52.648C251.354 50.1733 252.335 48.2107 254.383 46.76C256.431 45.3093 258.991 44.584 262.063 44.584C263.855 44.584 265.135 44.968 265.903 45.736C266.756 46.4187 267.226 47.8267 267.311 49.96C267.311 52.0933 267.354 53.672 267.439 54.696C270.17 51.2827 272.858 48.8507 275.503 47.4C278.148 45.864 280.964 45.096 283.951 45.096C288.73 45.096 292.612 47.016 295.599 50.856C298.671 54.696 300.207 59.7307 300.207 65.96C300.207 70.4827 299.482 74.8773 298.031 79.144C296.58 83.4107 294.575 87.2933 292.015 90.792C293.807 91.304 295.3 91.56 296.495 91.56C299.311 91.56 301.999 90.536 304.559 88.488C307.119 86.44 310.404 83.0267 314.415 78.248C315.439 77.0533 316.591 76.456 317.871 76.456ZM267.183 93.352C270.255 92.6693 273.071 91.0053 275.631 88.36C278.276 85.6293 280.367 82.3013 281.903 78.376C283.439 74.3653 284.207 70.184 284.207 65.832C284.207 63.272 283.695 61.352 282.671 60.072C281.647 58.7067 280.282 58.024 278.575 58.024C275.503 58.024 271.791 61.2667 267.439 67.752C267.354 71.5067 267.311 77.0107 267.311 84.264C267.311 88.1893 267.268 91.2187 267.183 93.352ZM242.735 150.952C245.039 150.952 246.959 145.917 248.495 135.848C250.031 125.864 251.012 113.405 251.439 98.472C247.77 107.005 244.868 115.155 242.735 122.92C240.602 130.685 239.535 137.213 239.535 142.504C239.535 145.235 239.876 147.325 240.559 148.776C241.156 150.227 241.882 150.952 242.735 150.952Z"
          className={className}
        />
        <path
          d="M356.968 80.296C358.077 80.296 358.931 80.808 359.528 81.832C360.211 82.856 360.552 84.264 360.552 86.056C360.552 89.128 359.827 91.7733 358.376 93.992C355.987 97.6613 352.829 100.52 348.904 102.568C345.064 104.616 340.456 105.64 335.08 105.64C326.888 105.64 320.531 103.208 316.008 98.344C311.485 93.3947 309.224 86.7387 309.224 78.376C309.224 72.488 310.461 67.0267 312.936 61.992C315.411 56.872 318.824 52.8187 323.176 49.832C327.613 46.8453 332.605 45.352 338.152 45.352C343.101 45.352 347.069 46.8453 350.056 49.832C353.043 52.7333 354.536 56.7013 354.536 61.736C354.536 67.624 352.403 72.7013 348.136 76.968C343.955 81.1493 336.787 84.4773 326.632 86.952C328.68 90.8773 332.136 92.84 337 92.84C340.499 92.84 343.357 92.0293 345.576 90.408C347.88 88.7867 350.525 86.056 353.512 82.216C354.536 80.936 355.688 80.296 356.968 80.296ZM335.976 57.896C332.819 57.896 330.131 59.7307 327.912 63.4C325.779 67.0693 324.712 71.5067 324.712 76.712V76.968C329.747 75.7733 333.715 73.9813 336.616 71.592C339.517 69.2027 340.968 66.4293 340.968 63.272C340.968 61.6507 340.499 60.3707 339.56 59.432C338.707 58.408 337.512 57.896 335.976 57.896Z"
          className={className}
        />
      </g>
    </svg>
  );
};

export default Recipe;
