import '../scss/Input/TitleDescriptionInput.scss'

const TitleDescriptionInput = () => {
  return (
      <div className={`tdModal-container`}>
        <div className={`textBox`}>
          <h1>Title</h1>
          <h2>content</h2>
        </div>
        <form className={`tdFormBox`}>
          <textarea className={`modalInput`} />
          <div className={`submitBtn`}>NEXT</div>
        </form>
      </div>
  )
}

export default TitleDescriptionInput;
