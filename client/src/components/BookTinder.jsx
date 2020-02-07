import React from 'react';
import { useSpring, animated } from 'react-spring';
import { useGestureResponder } from 'react-gesture-responder';
import { Heart } from 'react-feather';

const genres = ['comedy', 'thriller', 'fantasy', 'romance'];

function Slider(props) {
  // extract card
  const { book, handleNoClick, handleYesClick } = props;

  const [isLiking, setIsLiking] = React.useState(false);
  const [{ x }, set] = useSpring(() => ({ x: 0 }));

  function shouldLike(x) {
    return x < -100;
  }

  const { bind } = useGestureResponder({
    onStartShouldSet: () => true,
    onMove: ({ delta, xy }) => {
      const like = shouldLike(delta[0]);
      if (like !== isLiking) {
        setIsLiking(like);
      }

      set({ x: delta[0], immediate: true });
    },
    onRelease: ({ delta }) => {
      if (shouldLike(delta[0])) {
        handleYesClick();
      } else if (delta[0] > 200) {
        handleNoClick();
      }

      set({ x: 0, immediate: false });
    },
  });

  const heartPosition = x.interpolate({
    map: (x) => {
      const xa = Math.abs(x);
      return addResistance(xa);
    },
    range: [0, 300],
    output: ['translateX(15px)', 'translateX(-135px)'],
    extrapolate: 'clamp',
  });

  function addResistance(x) {
    const absX = Math.abs(x);

    if (absX > 150) {
      return x + (absX - 150) * 0.6 * (x < 0 ? 1 : -1);
    }

    return x;
  }
  return (
    <animated.div className="list-item">
      <div
        className="background"
        style={{
          borderRadius: '5px',
          overflow: 'hidden',
          transform: 'background 0.3s ease',
          background: isLiking ? '#14833c' : '#374047',
        }}
      >
        <animated.div
          style={{
            transform: heartPosition
          }}
        >
          <Heart
            size={60}
            style={{
              color: '#374047',
              fill: isLiking ? 'white' : 'transparent',
              transform: isLiking ? 'scale(0.85)' : 'scale(1)',
              transition: 'transform 0.3s ease',
            }}
          />
        </animated.div>
      </div>
      <animated.div
        {...bind}
        style={{
          transform: x.interpolate(x => `translateX(${addResistance(x)}px)`)
        }}
        className="sliding-pane"
      >
        {book}
      </animated.div>
    </animated.div>
  );
}

export default Slider;
