import styled from "styled-components";

const ButtonOrder: React.FC<{
  content: string;
  onClick?: () => void;
}> = ({ content, onClick }) => {
  return (
    <StyledWrapper>
      <button onClick={onClick} className="button">
        <span className="label">
          <span className="content">+ {content}</span>
        </span>
        <span className="gradient-container">
          <span className="gradient" />
        </span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    border: none;
    outline: none;
    background-color: #3a3a3a;
    width: 100%;
    height: 60px;
    font-size: 18px;
    color: #fff;
    font-weight: 600;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: relative;
    transition: all 0.3s;
  }

  .button::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    width: 104%;
    height: 120%;
    z-index: -1;
    border-radius: inherit;
    transition: all 0.3s;
  }

  .gradient-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 106%;
    height: 115%;
    overflow: hidden;
    border-radius: inherit;
    z-index: -2;
    filter: blur(10px);
    transition: all 0.3s;
  }

  .gradient {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 110%;
    aspect-ratio: 1;
    border-radius: 100%;
    transition: all 0.3s;
    background-image: linear-gradient(
      90deg,
      hsl(28, 100%, 85%),
      hsl(32, 100%, 70%),
      hsl(36, 100%, 60%),
      hsl(20, 100%, 50%),
      hsl(15, 90%, 45%)
    );
    animation: rotate 2s linear infinite;
    filter: blur(10px);
  }

  .label {
    width: 90%;
    height: 45px;
    text-align: center;
    line-height: 45px;
    border-radius: 22px;
    background-color: rgba(43, 43, 43, 1);
    background-image: linear-gradient(
      180deg,
      rgb(43, 43, 43) 0%,
      rgb(68, 68, 68) 100%
    );
  }
  .content {
    width: 100%;
    display: inline-block; /* hoặc block nếu phù hợp */
    transition-duration: 500ms;
  }

  .content:hover {
    transform: translateX(0.375rem);
  }

  .button:hover .gradient-container {
    transform: translate(-50%, -50%) scale(0.98);
    filter: blur(5px);
  }

  .button:hover .gradient {
    filter: blur(5px);
  }

  @keyframes rotate {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;

export default ButtonOrder;
