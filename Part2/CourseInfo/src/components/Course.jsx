import Header from "./Header"
import Content from "./Content"
import Footer from "./Footer"

const Course = ( { id, course} ) => {
    return (
      <div>
        <Header courseName={course.name}/>
        <Content parts={course.parts}/>
        <Footer parts={course.parts}/>
      </div>
    )
}

export default Course
