export const Badge = props => {
  const classes = `m-1 badge bg-${props.color}`
  return <span className={classes}>{props.name}</span>
}
