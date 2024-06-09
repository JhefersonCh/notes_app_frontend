/* eslint-disable react/prop-types */
export const EmptyResponse = ({ title, content }) => {
  return (
    <article className="text-center">
      <h1>{title ? title : "Oops, there's nothing here."}</h1>
      <img style={{width: "200px", marginTop: "20px", marginBottom: "20px"}} src="src/assets/empty-response.png" alt="image" />
      <h3>{content ? content : 'Try adding some.'}</h3>
    </article>
  )
}