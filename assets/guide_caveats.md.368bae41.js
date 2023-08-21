import{_ as s,o as a,c as n,X as l}from"./chunks/framework.6e839c56.js";const A=JSON.parse('{"title":"Caveats","description":"","frontmatter":{},"headers":[],"relativePath":"guide/caveats.md","filePath":"guide/caveats.md","lastUpdated":1692634499000}'),o={name:"guide/caveats.md"},p=l(`<h1 id="caveats" tabindex="-1">Caveats <a class="header-anchor" href="#caveats" aria-label="Permalink to &quot;Caveats&quot;">​</a></h1><p>In the world of always changing tooling and evolving specs, it is hard to avoid weird edge cases that can lead to hours of wasted time. On this page you may find some known caveats and potential issues when using data classes, and possible ways to resolve or avoid them.</p><h2 id="optional-keys-and-code-compilation" tabindex="-1">Optional keys and code compilation <a class="header-anchor" href="#optional-keys-and-code-compilation" aria-label="Permalink to &quot;Optional keys and code compilation&quot;">​</a></h2><p>Defining a data class you may find yourself in a situation where a property doesn&#39;t have a reasonable default value. Actual value may be provided during instantiation or the property&#39;s value can be treated as missing.</p><p>The most universal approach (i.e. works in any environment for both TypeScript and Flowtype) going to be the use of <code>null</code> as default value:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Entity</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Data</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">optionalProp</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">null</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> entity </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> Entity</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">create</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// &gt; Entity { optionalProp: null }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> payload </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> JSON</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">stringify</span><span style="color:#A6ACCD;">(entity)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// &gt; { &quot;optionalProp&quot;: null }</span></span></code></pre></div><p>When using TypeScript, you may want to use optional parameters instead of nullable types, as a less noisy syntax:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Entity</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Data</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">optionalProp</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> entity </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> Entity</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">create</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// &gt; Entity { optionalProp: undefined }</span></span></code></pre></div><p>When doing so, you have to consider ensure following: you&#39;re using <code>tsc</code> version 4.3.2 or higher and either your compile <code>target</code> is <code>es2022</code> or <a href="https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#the-usedefineforclassfields-flag-and-the-declare-property-modifier" target="_blank" rel="noreferrer"><code>useDefineForClassFields</code> is set to <code>true</code></a>. You may find this flag being set to <code>false</code> if some dependencies in your system rely on the old behavior of class fields initialization. In any other case, optional properties are going to be missing completely and you won&#39;t be able to define them using <code>create()</code> method.</p><p><strong>Warning</strong>: During serialization, undefined values do not appear in resulting JSON string:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight has-highlighted-lines"><code><span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Entity</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Data</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">optionalProp</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> entity </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> Entity</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">create</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// &gt; Entity { optionalProp: undefined }</span></span>
<span class="line"></span>
<span class="line highlighted"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> payload </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> JSON</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">stringify</span><span style="color:#A6ACCD;">(entity)</span><span style="color:#89DDFF;">;</span></span>
<span class="line highlighted"><span style="color:#676E95;font-style:italic;">// &gt; {}</span></span></code></pre></div><p>When using Flowtype, it is preferable to stick to nullable types with <code>null</code> explicitly set as default value. Basic Flowtype plugins for Babel going to strip out typings including properties themselves.</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Entity</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Data</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">optionalProp</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">?</span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> entity </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> Entity</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">create</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// &gt; Entity { optionalProp: null }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> payload </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> JSON</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">stringify</span><span style="color:#A6ACCD;">(entity)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// &gt; { &quot;optionalProp&quot;: null }</span></span></code></pre></div><h2 id="explicit-this-signature-in-methods" tabindex="-1">Explicit <code>this</code> signature in methods <a class="header-anchor" href="#explicit-this-signature-in-methods" aria-label="Permalink to &quot;Explicit \`this\` signature in methods&quot;">​</a></h2><p>When using TypeScript, whenever a data class contains a method, that uses <code>this.copy()</code> or <code>this.equals()</code>, you may see a typing error. But you have done nothing wrong. There are some limitations in TypeScript or this library&#39;s typings, but that&#39;s something you can easily fix:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight has-highlighted-lines"><code><span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Entity</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Data</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">counter</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">13</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line highlighted"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// set explicit this type to a method that uses other data class methods</span></span>
<span class="line highlighted"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">increment</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;font-style:italic;">this</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Entity</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">copy</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> counter</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">counter</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> entity </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> Entity</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">create</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">counter</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// &gt; Entity { counter: 10 }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> updated </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> entity</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">increment</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// &gt; Entity { counter: 11 }</span></span></code></pre></div>`,16),e=[p];function t(c,r,i,y,D,F){return a(),n("div",null,e)}const d=s(o,[["render",t]]);export{A as __pageData,d as default};
