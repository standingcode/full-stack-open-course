const Header = (props) => {
  return <h1>{props.course}</h1>;
};

// const Content = (props) => {
//  return(

//   props.content.map((partData, index)  => (
//     <p key={index}>
//       {partData[0]}: {partData[1]}
//     </p>
//   ))

//  )
// }

// const Total = (props) => {

//   var total = 0

//   props.content.map((partData)  => (
//     total += partData[1]
//   ))

//   return(
//     <p>Number of exercises {total}</p>
//   )
// }

const Content = (props) => {
  return (
    <>
      <Part part={props.part1} exercises={props.exercises1} />
      <Part part={props.part2} exercises={props.exercises2} />
      <Part part={props.part3} exercises={props.exercises3} />
    </>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

const Total = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.exercises1 + props.exercises2 + props.exercises3}
    </p>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  // const content = [[part1, exercises1],[part2, exercises2],[part3, exercises3]]

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        part2={part2}
        part3={part3}
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
      <Total
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
    </div>
  );
};

export default App;
