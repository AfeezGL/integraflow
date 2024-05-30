import { IntegraflowIconProps } from "@/types";

export const PresentationChartLine = ({ color = "#AAAACC", size = 56, ...props }: IntegraflowIconProps) => {
    const width = size;
    const height = width * 0.946;
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 56 53"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.0996094 2.52495C0.0996094 1.90832 0.344564 1.31695 0.780586 0.880928C1.21661 0.444906 1.80798 0.199951 2.42461 0.199951H53.5746C54.1912 0.199951 54.7826 0.444906 55.2186 0.880928C55.6547 1.31695 55.8996 1.90832 55.8996 2.52495C55.8996 3.14158 55.6547 3.73295 55.2186 4.16897C54.7826 4.605 54.1912 4.84995 53.5746 4.84995H52.7996V31.975C52.7996 34.2359 51.9014 36.4043 50.3027 38.003C48.7039 39.6018 46.5356 40.4999 44.2746 40.4999H40.9514L43.4252 49.9859C43.5814 50.5828 43.4941 51.2173 43.1825 51.7499C42.8709 52.2824 42.3605 52.6693 41.7636 52.8255C41.1667 52.9818 40.5322 52.8945 39.9997 52.5828C39.4672 52.2712 39.0802 51.7608 38.924 51.164L38.5706 49.7999H17.4286L17.0752 51.164C16.919 51.7608 16.5321 52.2712 15.9995 52.5828C15.467 52.8945 14.8325 52.9818 14.2356 52.8255C13.6387 52.6693 13.1283 52.2824 12.8167 51.7499C12.5051 51.2173 12.4178 50.5828 12.574 49.9859L15.0509 40.4999H11.7246C9.46364 40.4999 7.29527 39.6018 5.69652 38.003C4.09778 36.4043 3.19961 34.2359 3.19961 31.975V4.84995H2.42461C1.80798 4.84995 1.21661 4.605 0.780586 4.16897C0.344564 3.73295 0.0996094 3.14158 0.0996094 2.52495ZM19.8559 40.4999L18.6438 45.1499H37.3585L36.1433 40.4999H19.8559ZM43.0749 12.8139C43.4329 13.3158 43.5768 13.9394 43.4751 14.5475C43.3734 15.1556 43.0343 15.6983 42.5324 16.0564C38.6515 18.8271 35.1152 22.0512 31.9986 25.6603C31.7897 25.9017 31.5333 26.0975 31.2454 26.2354C30.9575 26.3734 30.6443 26.4506 30.3252 26.4623C30.0062 26.4739 29.6882 26.4197 29.391 26.3031C29.0938 26.1864 28.8238 26.0098 28.5979 25.7843L23.3496 20.5391L16.4676 27.4211C16.253 27.643 15.9964 27.82 15.7127 27.9417C15.429 28.0634 15.1238 28.1274 14.8151 28.13C14.5064 28.1325 14.2003 28.0735 13.9146 27.9565C13.6289 27.8395 13.3694 27.6667 13.1512 27.4483C12.933 27.2299 12.7605 26.9702 12.6438 26.6844C12.527 26.3986 12.4683 26.0925 12.4711 25.7838C12.474 25.475 12.5382 25.17 12.6602 24.8864C12.7822 24.6028 12.9594 24.3463 13.1816 24.132L21.7066 15.607C22.1425 15.1716 22.7335 14.927 23.3496 14.927C23.9657 14.927 24.5567 15.1716 24.9926 15.607L30.151 20.7623C33.0854 17.6149 36.3276 14.7693 39.8292 12.2683C40.0779 12.0912 40.3591 11.9648 40.6567 11.8964C40.9543 11.8279 41.2624 11.8188 41.5635 11.8694C41.8646 11.9201 42.1528 12.0296 42.4116 12.1916C42.6704 12.3537 42.8978 12.5651 43.0749 12.8139Z"
                fill={color}
            />
        </svg>
    );
};
