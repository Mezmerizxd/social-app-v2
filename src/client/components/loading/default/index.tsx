import './styles.scss';

export default function LoadingDefault({
    isLoading,
    name,
    style,
}: Client.Components.Loading.Default) {
    return (
        isLoading && (
            <div className="Loading-container" style={style}>
                <div className="Loading-default" id={name} key={name}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    );
}
