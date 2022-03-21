export default docs = (input) => {
  return `
    <il>
      ${input.commands.map(({name, description}) =>
        `<ul>${name}: ${description}</ul>`).join('')}
    </il>`;
};