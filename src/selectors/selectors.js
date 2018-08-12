/**
 * Created by Lu on 8/11/2018.
 */
export function authorsFormatted(authors) {
  return authors.map(author => {
    return {
      value: author.id,
      text: `${author.firstName} ${author.lastName}`
    };
  });
}
