
const ProviderComposer = ({ components, children }) => {

    return (
        <>
            {components.reduceRight((acc, Comp) => {
                return <Comp>{acc}</Comp>;
            }, children)}
        </>
    );
};

export default ProviderComposer;
