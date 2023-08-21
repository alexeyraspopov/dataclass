import{_ as s,o as e,c as a,X as o}from"./chunks/framework.6e839c56.js";const F=JSON.parse('{"title":"Objects Equality","description":"","frontmatter":{},"headers":[],"relativePath":"guide/objects-equality.md","filePath":"guide/objects-equality.md","lastUpdated":1692634499000}'),l={name:"guide/objects-equality.md"},n=o(`<h1 id="objects-equality" tabindex="-1">Objects Equality <a class="header-anchor" href="#objects-equality" aria-label="Permalink to &quot;Objects Equality&quot;">​</a></h1><p>The biggest part of dataclasses flexibility is the fact they can be compared by the value they contain, rather than by the instances reference.</p><p>Let&#39;s consider an example:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Data</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">dataclass</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Circle</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Data</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">x</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">y</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">radius</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> circleA </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> Circle</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">create</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">x</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">y</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">radius</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// let&#39;s assume the new value is coming from an outside source</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> circleB </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> circleA</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">copy</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">radius</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">getCircleRadius</span><span style="color:#A6ACCD;">() </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// …and now we need to check if the value actually changed</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> isEqual </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> circleA</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">equals</span><span style="color:#A6ACCD;">(circleB)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>This guide describes what happens when <code>target.equals(other)</code> is being called.</p><ol><li>The runtime does not check <code>other</code> for being the same data class as <code>target</code>. This is what supposed to be checked by the typing system (TypeScript or Flowtype) even before the code is executed.</li><li>The <code>equals()</code> method iterates over the properties of the <code>target</code> class and compares the values to the same keys in <code>other</code> instance.</li><li>If two values are not strictly equal (via <code>===</code> comparison), and both of the values are not nullish (i.e. neither <code>undefined</code> nor <code>null</code>), the method checks whether these values are data classes that also have <code>equals()</code> method. If so, the rest of comparison for these two values is delegated to their <code>equals()</code> method.</li><li>If the values are not data classes, <code>.valueOf()</code> method is used for both values to extract possible primitive representation. The resulting values are compared using <code>===</code> operator. If result is <code>false</code>, <code>equals()</code> method returns <code>false</code> and skip comparing the rest of the properties.</li><li>If none of changed properties are different in both <code>target</code> and <code>other</code>, <code>equals()</code> method returns <code>true</code>.</li></ol><p>The idea behind this algorithm attempts to find <code>equals()</code> of a dataclass properties is that you can create a data class that will be using another data class as a property.</p><p>The reason for using <code>valueOf()</code> for other types of properties is the fact that there are some data types in JavaScript that are actually value objects and should be compared by their value while having different reference. The prime example of it is <code>Date</code>. Instead of directly checking for values to be instanceof of <code>Date</code>, <code>equals()</code> method relies on the mechanism of <code>valueOf()</code> itself, allowing you to define custom <code>valueOf()</code> methods for any special data types that can be a part of data classes.</p>`,8),t=[n];function p(c,r,i,y,d,D){return e(),a("div",null,t)}const A=s(l,[["render",p]]);export{F as __pageData,A as default};