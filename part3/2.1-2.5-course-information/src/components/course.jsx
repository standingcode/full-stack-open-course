const Course = ({ course }) => {
  const totalExercises = course.parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );

  return (
    <>
      <h2>{course.name}</h2>
      {course.parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
      {
        <p>
          <b>total of {totalExercises} exercises</b>
        </p>
      }
    </>
  );
};

const Courses = ({ courses }) => {
  return (
    <>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </>
  );
};

export default Courses;
