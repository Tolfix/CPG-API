declare global
{
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Map<K, V>
    {
        array(): Array<V>
    }
}

export default Object.defineProperty(Map.prototype, "array", {
    value: function()
    {
        return [...(this.values())];
    }
});

